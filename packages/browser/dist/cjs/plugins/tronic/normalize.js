"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize = void 0;
function normalize(receiver, json, settings) {
    var user = receiver.user();
    delete json.options;
    // json.writeKey = settings?.apiKey
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
exports.normalize = normalize;
//# sourceMappingURL=normalize.js.map