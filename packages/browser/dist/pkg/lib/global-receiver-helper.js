var _globalReceiverKey = 'receiver';
export function getGlobalReceiver() {
    return window[_globalReceiverKey];
}
export function setGlobalReceiverKey(key) {
    _globalReceiverKey = key;
}
export function setGlobalReceiver(receiver) {
    ;
    window[_globalReceiverKey] = receiver;
}
//# sourceMappingURL=global-receiver-helper.js.map