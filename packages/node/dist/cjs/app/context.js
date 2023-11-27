"use strict";
// create a derived class since we may want to add node specific things to Context later
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const receiver_core_1 = require("@tronic/receiver-core");
// While this is not a type, it is a definition
class Context extends receiver_core_1.CoreContext {
    static system() {
        return new this({ channelId: '000', type: 'track', event: 'system' });
    }
}
exports.Context = Context;
//# sourceMappingURL=context.js.map