/**
 * Stores the global window receiver key
 */
var _globalReceiverKey = 'receiver';
/**
 * Gets the global receiver/buffer
 * @param key name of the window property where the buffer is stored (default: receiver)
 * @returns ReceiverSnippet
 */
export function getGlobalReceiver() {
    return window[_globalReceiverKey];
}
/**
 * Replaces the global window key for the receiver/buffer object
 * @param key key name
 */
export function setGlobalReceiverKey(key) {
    _globalReceiverKey = key;
}
/**
 * Sets the global receiver object
 * @param receiver receiver snippet
 */
export function setGlobalReceiver(receiver) {
    ;
    window[_globalReceiverKey] = receiver;
}
//# sourceMappingURL=global-receiver-helper.js.map