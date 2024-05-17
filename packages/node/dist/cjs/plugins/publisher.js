"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publisher = void 0;
const receiver_core_1 = require("@tronic/receiver-core");
const create_url_1 = require("../lib/create-url");
const extract_promise_parts_1 = require("../lib/extract-promise-parts");
const context_batch_1 = require("./context-batch");
function sleep(timeoutInMs) {
    return new Promise((resolve) => setTimeout(resolve, timeoutInMs));
}
function noop() { }
// The Publisher is responsible for batching events and sending them to the Tronic API.
class Publisher {
    constructor({ host, path, maxRetries, maxEventsInBatch, flushInterval, writeKey, httpRequestTimeout, httpClient, disable, }, emitter) {
        this._emitter = emitter;
        this._maxRetries = maxRetries;
        this._maxEventsInBatch = Math.max(maxEventsInBatch, 1);
        this._flushInterval = flushInterval;
        this._auth = writeKey; // b64encode(`${writeKey}:`)
        this._url = (0, create_url_1.tryCreateFormattedUrl)(host ?? "http://localhost:3000", path ?? "/");
        this._httpRequestTimeout = httpRequestTimeout ?? 10000;
        this._disable = Boolean(disable);
        this._httpClient = httpClient;
    }
    createBatch() {
        this.pendingFlushTimeout && clearTimeout(this.pendingFlushTimeout);
        const batch = new context_batch_1.ContextBatch(this._maxEventsInBatch);
        this._batch = batch;
        this.pendingFlushTimeout = setTimeout(() => {
            if (batch === this._batch) {
                this._batch = undefined;
            }
            this.pendingFlushTimeout = undefined;
            if (batch.length) {
                this.send(batch).catch(noop);
            }
        }, this._flushInterval);
        return batch;
    }
    clearBatch() {
        this.pendingFlushTimeout && clearTimeout(this.pendingFlushTimeout);
        this._batch = undefined;
    }
    flushAfterClose(pendingItemsCount) {
        if (!pendingItemsCount) {
            // if number of pending items is 0, there will never be anything else entering the batch, since the app is closed.
            return;
        }
        this._closeAndFlushPendingItemsCount = pendingItemsCount;
        // if batch is empty, there's nothing to flush, and when things come in, enqueue will handle them.
        if (!this._batch)
            return;
        // the number of globally pending items will always be larger or the same as batch size.
        // Any mismatch is because some globally pending items are in plugins.
        const isExpectingNoMoreItems = this._batch.length === pendingItemsCount;
        if (isExpectingNoMoreItems) {
            this.send(this._batch).catch(noop);
            this.clearBatch();
        }
    }
    // Enqueues the context for future delivery.
    enqueue(ctx) {
        const batch = this._batch ?? this.createBatch();
        const { promise: ctxPromise, resolve } = (0, extract_promise_parts_1.extractPromiseParts)();
        const pendingItem = {
            context: ctx,
            resolver: resolve,
        };
        // The following logic ensures that a batch is never orphaned,
        // and is always sent before a new batch is created.
        // Add an event to the existing batch.
        // Success: Check if batch is full or no more items are expected to come in (i.e. closing). If so, send batch.
        // Failure: Assume event is too big to fit in current batch - send existing batch.
        // Add an event to the new batch.
        // Success: Check if batch is full and send if it is.
        // Failure: Event exceeds maximum size (it will never fit), fail the event.
        const addStatus = batch.tryAdd(pendingItem);
        if (addStatus.success) {
            const isExpectingNoMoreItems = batch.length === this._closeAndFlushPendingItemsCount;
            const isFull = batch.length === this._maxEventsInBatch;
            if (isFull || isExpectingNoMoreItems) {
                this.send(batch).catch(noop);
                this.clearBatch();
            }
            return ctxPromise;
        }
        // If the new item causes the maximimum event size to be exceeded, send the current batch and create a new one.
        if (batch.length) {
            this.send(batch).catch(noop);
            this.clearBatch();
        }
        const fallbackBatch = this.createBatch();
        const fbAddStatus = fallbackBatch.tryAdd(pendingItem);
        if (fbAddStatus.success) {
            const isExpectingNoMoreItems = fallbackBatch.length === this._closeAndFlushPendingItemsCount;
            if (isExpectingNoMoreItems) {
                this.send(fallbackBatch).catch(noop);
                this.clearBatch();
            }
            return ctxPromise;
        }
        else {
            // this should only occur if max event size is exceeded
            ctx.setFailedDelivery({
                reason: new Error(fbAddStatus.message),
            });
            return Promise.resolve(ctx);
        }
    }
    async send(batch) {
        if (this._closeAndFlushPendingItemsCount) {
            this._closeAndFlushPendingItemsCount -= batch.length;
        }
        const events = batch.getEvents();
        const maxAttempts = this._maxRetries + 1;
        let currentAttempt = 0;
        while (currentAttempt < maxAttempts) {
            currentAttempt++;
            let failureReason;
            try {
                if (this._disable) {
                    return batch.resolveEvents();
                }
                const event = { ...events[0] };
                const data = {
                    ...event,
                    writeKey: `${this._auth}`,
                };
                // console.log('publisher::data::0', data);
                delete data["type"];
                delete data["options"];
                delete data["_metadata"];
                // console.log('publisher::data::1', data);
                // console.log('publisher::url', this._url + `/${event.type}`, data, this._auth);
                const request = {
                    url: this._url + `/${event.type}`,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "User-Agent": "receiver-node/latest",
                    },
                    data,
                    httpRequestTimeout: this._httpRequestTimeout,
                };
                this._emitter.emit("http_request", {
                    body: request.data,
                    method: request.method,
                    url: request.url,
                    headers: request.headers,
                });
                const response = await this._httpClient.makeRequest(request);
                if (response.status >= 200 && response.status < 300) {
                    // Successfully sent events, so exit!
                    batch.resolveEvents();
                    return;
                }
                else if (response.status === 400) {
                    // Request either malformed or size exceeded - don't retry.
                    resolveFailedBatch(batch, new Error(`[${response.status}] ${response.statusText}`));
                    return;
                }
                else {
                    // Treat other errors as transient and retry.
                    failureReason = new Error(`[${response.status}] ${response.statusText}`);
                }
            }
            catch (err) {
                // Network errors get thrown, retry them.
                failureReason = err;
            }
            // Final attempt failed, update context and resolve events.
            if (currentAttempt === maxAttempts) {
                resolveFailedBatch(batch, failureReason);
                return;
            }
            // Retry after attempt-based backoff.
            await sleep((0, receiver_core_1.backoff)({
                attempt: currentAttempt,
                minTimeout: 25,
                maxTimeout: 1000,
            }));
        }
    }
}
exports.Publisher = Publisher;
function resolveFailedBatch(batch, reason) {
    batch.getContexts().forEach((ctx) => ctx.setFailedDelivery({ reason }));
    batch.resolveEvents();
}
//# sourceMappingURL=publisher.js.map