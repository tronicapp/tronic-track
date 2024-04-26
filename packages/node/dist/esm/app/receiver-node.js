import { bindAll, pTimeout } from '@tronic/receiver-core';
import { validateSettings } from './settings';
import { version } from '../generated/version';
import { createConfiguredNodePlugin } from '../plugins';
import { NodeEventFactory } from './event-factory';
import { dispatchAndEmit } from './dispatch-emit';
import { NodeEmitter } from './emitter';
import { Context } from './context';
import { NodeEventQueue } from './event-queue';
import { FetchHTTPClient } from '../lib/http-client';
export class Receiver extends NodeEmitter {
    constructor(settings) {
        super();
        this._isClosed = false;
        this._pendingEvents = 0;
        validateSettings(settings);
        this._eventFactory = new NodeEventFactory();
        this._queue = new NodeEventQueue();
        // console.log('rn0::0');
        const flushInterval = settings.flushInterval ?? 10000;
        this._closeAndFlushDefaultTimeout = flushInterval * 1.25; // add arbitrary multiplier in case an event is in a plugin.
        const { plugin, publisher } = createConfiguredNodePlugin({
            writeKey: settings.writeKey,
            host: settings.host,
            path: settings.path,
            maxRetries: settings.maxRetries ?? 3,
            maxEventsInBatch: settings.maxEventsInBatch ?? 15,
            httpRequestTimeout: settings.httpRequestTimeout,
            disable: settings.disable,
            flushInterval,
            httpClient: typeof settings.httpClient === 'function'
                ? new FetchHTTPClient(settings.httpClient)
                : settings.httpClient ?? new FetchHTTPClient(),
        }, this);
        // console.log('rn0::1');
        this._publisher = publisher;
        this.ready = this.register(plugin).then(() => undefined);
        // console.log('rn0::2');
        this.emit('initialize', settings);
        // console.log('rn0::3');
        bindAll(this);
    }
    get VERSION() {
        return version;
    }
    // Call this method to stop collecting new events and flush all existing events.
    // This method also waits for any event method-specific callbacks to be triggered,
    // and any of their subsequent promises to be resolved/rejected.
    closeAndFlush({ timeout = this._closeAndFlushDefaultTimeout, } = {}) {
        this._publisher.flushAfterClose(this._pendingEvents);
        this._isClosed = true;
        const promise = new Promise((resolve) => {
            if (!this._pendingEvents) {
                resolve();
            }
            else {
                this.once('drained', () => resolve());
            }
        });
        return timeout ? pTimeout(promise, timeout).catch(() => undefined) : promise;
    }
    _dispatch(tronicEvent, callback) {
        if (this._isClosed) {
            this.emit('call_after_close', tronicEvent);
            return undefined;
        }
        this._pendingEvents++;
        dispatchAndEmit(tronicEvent, this._queue, this, callback)
            .catch((ctx) => ctx)
            .finally(() => {
            this._pendingEvents--;
            if (!this._pendingEvents) {
                this.emit('drained');
            }
        });
    }
    page({ userId, anonymousId, category, name, properties, context, timestamp, messageId, }, callback) {
        const tronicEvent = this._eventFactory.page(category ?? null, name ?? null, properties, { context, anonymousId, userId, timestamp, messageId });
        this._dispatch(tronicEvent, callback);
    }
    // Includes a unique userId and (maybe anonymousId) and any optional traits you know about them.
    identify({ 
    // channelId,
    userId, anonymousId, traits = {}, context, timestamp, }, callback) {
        const tronicEvent = this._eventFactory.identify(/* channelId, */ userId, traits, {
            context,
            anonymousId,
            userId,
            timestamp,
        });
        this._dispatch(tronicEvent, callback);
    }
    // Records actions your users perform.
    track({ 
    // channelId,
    userId, anonymousId, event, properties, context, timestamp, }, callback) {
        // console.log('rn::track');
        const tronicEvent = this._eventFactory.track(/* channelId, */ event, properties, {
            context,
            userId,
            anonymousId,
            timestamp,
        });
        // console.log('rn::track::0', tronicEvent);
        this._dispatch(tronicEvent, callback);
    }
    // Registers one or more plugins to augment Receiver functionality.
    register(...plugins) {
        return this._queue.criticalTasks.run(async () => {
            const ctx = Context.system();
            const registrations = plugins.map((xt) => this._queue.register(ctx, xt, this));
            await Promise.all(registrations);
            this.emit('register', plugins.map((el) => el.name));
        });
    }
    // Deregisters one or more plugins based on their names.
    async deregister(...pluginNames) {
        const ctx = Context.system();
        const deregistrations = pluginNames.map((pl) => {
            const plugin = this._queue.plugins.find((p) => p.name === pl);
            if (plugin) {
                return this._queue.deregister(ctx, plugin, this);
            }
            else {
                ctx.log('warn', `plugin ${pl} not found`);
            }
        });
        await Promise.all(deregistrations);
        this.emit('deregister', pluginNames);
    }
}
//# sourceMappingURL=receiver-node.js.map