export function normalize(receiver, json, settings) {
    var user = receiver.user();
    delete json.options;
    json.writeKey = settings === null || settings === void 0 ? void 0 : settings.apiKey;
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