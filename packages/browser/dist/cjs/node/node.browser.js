"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiverNode = void 0;
var ReceiverNode = /** @class */ (function () {
    function ReceiverNode() {
    }
    ReceiverNode.load = function () {
        return Promise.reject(new Error('ReceiverNode is not available in browsers.'));
    };
    return ReceiverNode;
}());
exports.ReceiverNode = ReceiverNode;
//# sourceMappingURL=node.browser.js.map