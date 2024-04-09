import { EventFactory } from '@tronic/receiver-core';
import { createMessageId } from '../lib/get-message-id';
export class NodeEventFactory extends EventFactory {
    constructor() {
        super({ createMessageId });
    }
}
//# sourceMappingURL=event-factory.js.map