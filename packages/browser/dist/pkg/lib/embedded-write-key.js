// This variable is used as an optional fallback for when customers
// host or proxy their own receiver.js.
try {
    window.receiverWriteKey = '__WRITE_KEY__';
}
catch (_) {
    // @ eslint-disable-next-line
}
export function embeddedWriteKey() {
    if (window.receiverWriteKey === undefined) {
        return undefined;
    }
    // this is done so that we don't accidentally override every reference to __write_key__
    return window.receiverWriteKey !== ['__', 'WRITE', '_', 'KEY', '__'].join('')
        ? window.receiverWriteKey
        : undefined;
}
//# sourceMappingURL=embedded-write-key.js.map