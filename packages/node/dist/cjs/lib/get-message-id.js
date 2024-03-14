"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageId = void 0;
const uuid_1 = require("./uuid");
// get a unique messageId with a very low chance of collisions
//using @lukeed/uuid/secure uses the node crypto module, which is the fastest
const createMessageId = () => {
    return `node-${Date.now()}-${(0, uuid_1.uuid)()}`;
};
exports.createMessageId = createMessageId;
//# sourceMappingURL=get-message-id.js.map