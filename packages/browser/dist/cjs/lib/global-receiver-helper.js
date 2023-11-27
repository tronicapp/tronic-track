"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGlobalReceiver = exports.setGlobalReceiverKey = exports.getGlobalReceiver = void 0;
/**
 * Stores the global window receiver key
 */
var _globalReceiverKey = 'receiver';
/**
 * Gets the global receiver/buffer
 * @param key name of the window property where the buffer is stored (default: receiver)
 * @returns ReceiverSnippet
 */
function getGlobalReceiver() {
    return window[_globalReceiverKey];
}
exports.getGlobalReceiver = getGlobalReceiver;
/**
 * Replaces the global window key for the receiver/buffer object
 * @param key key name
 */
function setGlobalReceiverKey(key) {
    _globalReceiverKey = key;
}
exports.setGlobalReceiverKey = setGlobalReceiverKey;
/**
 * Sets the global receiver object
 * @param receiver receiver snippet
 */
function setGlobalReceiver(receiver) {
    ;
    window[_globalReceiverKey] = receiver;
}
exports.setGlobalReceiver = setGlobalReceiver;
//# sourceMappingURL=global-receiver-helper.js.map