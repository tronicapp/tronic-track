import { CoreReceiver } from '@tronic/receiver-core';
import { ReceiverSettings } from './settings';
import { Callback } from './dispatch-emit';
import { NodeEmitter } from './emitter';
import { IdentifyParams, TrackParams, Plugin } from './types';
export declare class Receiver extends NodeEmitter implements CoreReceiver {
    private readonly _eventFactory;
    private _isClosed;
    private _pendingEvents;
    private readonly _closeAndFlushDefaultTimeout;
    private readonly _publisher;
    private readonly _queue;
    ready: Promise<void>;
    constructor(settings: ReceiverSettings);
    get VERSION(): string;
    /**
     * Call this method to stop collecting new events and flush all existing events.
     * This method also waits for any event method-specific callbacks to be triggered,
     * and any of their subsequent promises to be resolved/rejected.
     */
    closeAndFlush({ timeout, }?: {
        /** Set a maximum time permitted to wait before resolving. */
        timeout?: number;
    }): Promise<void>;
    private _dispatch;
    /**
     * Includes a unique userId and (maybe anonymousId) and any optional traits you know about them.
     */
    identify({ channelId, userId, anonymousId, traits, context, timestamp, integrations, }: IdentifyParams, callback?: Callback): void;
    /**
     * Records actions your users perform.
     */
    track({ channelId, userId, event, properties, }: TrackParams, callback?: Callback): void;
    /**
     * Registers one or more plugins to augment Receiver functionality.
     * @param plugins
     */
    register(...plugins: Plugin[]): Promise<void>;
    /**
     * Deregisters one or more plugins based on their names.
     * @param pluginNames - The names of one or more plugins to deregister.
     */
    deregister(...pluginNames: string[]): Promise<void>;
}
//# sourceMappingURL=receiver-node.d.ts.map