import { CoreEmitterContract, Emitter } from '@tronic/receiver-core';
import { Context } from './context';
import type { ReceiverSettings } from './settings';
import { TronicEvent } from './types';
export type NodeEmitterEvents = CoreEmitterContract<Context> & {
    initialize: [ReceiverSettings];
    call_after_close: [TronicEvent];
    http_request: [
        {
            url: string;
            method: string;
            headers: Record<string, string>;
            body: Record<string, any>;
        }
    ];
    drained: [];
};
export declare class NodeEmitter extends Emitter<NodeEmitterEvents> {
}
//# sourceMappingURL=emitter.d.ts.map