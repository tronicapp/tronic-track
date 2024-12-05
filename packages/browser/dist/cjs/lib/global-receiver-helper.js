"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGlobalReceiver = exports.setGlobalReceiverKey = exports.getGlobalReceiver = void 0;
var _globalReceiverKey = 'receiver';
function getGlobalReceiver() {
    return window[_globalReceiverKey];
}
exports.getGlobalReceiver = getGlobalReceiver;
function setGlobalReceiverKey(key) {
    _globalReceiverKey = key;
}
exports.setGlobalReceiverKey = setGlobalReceiverKey;
function setGlobalReceiver(receiver) {
    ;
    window[_globalReceiverKey] = receiver;
}
exports.setGlobalReceiver = setGlobalReceiver;
//# sourceMappingURL=global-receiver-helper.js.map