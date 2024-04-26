import { CoreReceiver } from '@tronic/receiver-core';
import { ReceiverSettings } from './settings';
import { Callback } from './dispatch-emit';
import { NodeEmitter } from './emitter';
import { IdentifyParams, TrackParams, Plugin, PageParams } from './types';
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
    closeAndFlush({ timeout, }?: {
        timeout?: number;
    }): Promise<void>;
    private _dispatch;
    page({ userId, anonymousId, category, name, properties, context, timestamp, messageId, }: PageParams, callback?: Callback): void;
    identify({ userId, anonymousId, traits, context, timestamp, }: IdentifyParams, callback?: Callback): void;
    track({ userId, anonymousId, event, properties, context, timestamp, }: TrackParams, callback?: Callback): void;
    register(...plugins: Plugin[]): Promise<void>;
    deregister(...pluginNames: string[]): Promise<void>;
}
//# sourceMappingURL=receiver-node.d.ts.map