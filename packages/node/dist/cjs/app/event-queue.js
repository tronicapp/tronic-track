"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeEventQueue = void 0;
const receiver_core_1 = require("@tronic/receiver-core");
class NodePriorityQueue extends receiver_core_1.PriorityQueue {
    constructor() {
        super(1, []);
    }
    // do not use an internal "seen" map
    getAttempts(ctx) {
        return ctx.attempts ?? 0;
    }
    updateAttempts(ctx) {
        ctx.attempts = this.getAttempts(ctx) + 1;
        return this.getAttempts(ctx);
    }
}
class NodeEventQueue extends receiver_core_1.CoreEventQueue {
    constructor() {
        super(new NodePriorityQueue());
    }
}
exports.NodeEventQueue = NodeEventQueue;
//# sourceMappingURL=event-queue.js.map