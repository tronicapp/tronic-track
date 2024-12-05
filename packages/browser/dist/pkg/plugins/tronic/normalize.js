export function normalize(receiver, json, settings) {
    var _a, _b;
    var user = receiver.user();
    delete json.options;
    json.writeKey = (_b = (_a = settings === null || settings === void 0 ? void 0 : settings.apiKey) !== null && _a !== void 0 ? _a : receiver.options.writeKey) !== null && _b !== void 0 ? _b : '';
    json.userId = json.userId || user.id();
    if (json.userId) {
        delete json.anonymousId;
        json.anonymousId = json.anonymousId || user.anonymousId();
    }
    // json.sentAt = new Date()
    /*
    const failed = receiver.queue.failedInitializations || []
    if (failed.length > 0) {
      json._metadata = { failedInitializations: failed }
    }
     */
    return json;
}
//# sourceMappingURL=normalize.js.map