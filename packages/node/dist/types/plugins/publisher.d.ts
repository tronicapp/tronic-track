import type { Context } from '../app/context';
import { NodeEmitter } from '../app/emitter';
import { HTTPClient } from '../lib/http-client';
export interface PublisherProps {
    host?: string;
    path?: string;
    flushInterval: number;
    maxEventsInBatch: number;
    maxRetries: number;
    writeKey: string;
    httpRequestTimeout?: number;
    disable?: boolean;
    httpClient: HTTPClient;
}
/**
 * The Publisher is responsible for batching events and sending them to the Tronic API.
 */
export declare class Publisher {
    private pendingFlushTimeout?;
    private _batch?;
    private _flushInterval;
    private _maxEventsInBatch;
    private _maxRetries;
    private _auth;
    private _url;
    private _closeAndFlushPendingItemsCount?;
    private _httpRequestTimeout;
    private _emitter;
    private _disable;
    private _httpClient;
    constructor({ host, path, maxRetries, maxEventsInBatch, flushInterval, writeKey, httpRequestTimeout, httpClient, disable, }: PublisherProps, emitter: NodeEmitter);
    private createBatch;
    private clearBatch;
    flushAfterClose(pendingItemsCount: number): void;
    /**
     * Enqueues the context for future delivery.
     * @param ctx - Context containing a Tronic event.
     * @returns a promise that resolves with the context after the event has been delivered.
     */
    enqueue(ctx: Context): Promise<Context>;
    private send;
}
//# sourceMappingURL=publisher.d.ts.map