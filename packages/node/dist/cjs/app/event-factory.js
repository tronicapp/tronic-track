"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeEventFactory = void 0;
const receiver_core_1 = require("@tronic/receiver-core");
const get_message_id_1 = require("../lib/get-message-id");
class NodeEventFactory extends receiver_core_1.EventFactory {
    constructor() {
        super({ createMessageId: get_message_id_1.createMessageId });
    }
}
exports.NodeEventFactory = NodeEventFactory;
//# sourceMappingURL=event-factory.js.map