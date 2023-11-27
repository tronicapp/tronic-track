import { EventFactory } from '@tronic/receiver-core';
import { TronicEvent } from './types';
export interface NodeEventFactory {
    track(...args: Parameters<EventFactory['track']>): TronicEvent;
    identify(...args: Parameters<EventFactory['identify']>): TronicEvent;
}
export declare class NodeEventFactory extends EventFactory {
    constructor();
}
//# sourceMappingURL=event-factory.d.ts.map