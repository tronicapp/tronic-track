var ReceiverNode = /** @class */ (function () {
    function ReceiverNode() {
    }
    ReceiverNode.load = function () {
        return Promise.reject(new Error('ReceiverNode is not available in browsers.'));
    };
    return ReceiverNode;
}());
export { ReceiverNode };
//# sourceMappingURL=node.browser.js.map