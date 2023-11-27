var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export function normalize(receiver, json, settings, integrations) {
    var _a;
    var user = receiver.user();
    delete json.options;
    json.writeKey = settings === null || settings === void 0 ? void 0 : settings.apiKey;
    json.userId = json.userId || user.id();
    json.anonymousId = json.anonymousId || user.anonymousId();
    json.sentAt = new Date();
    var failed = receiver.queue.failedInitializations || [];
    if (failed.length > 0) {
        json._metadata = { failedInitializations: failed };
    }
    var bundled = [];
    var unbundled = [];
    for (var key in integrations) {
        var integration = integrations[key];
        if (key === 'Segment.io') {
            bundled.push(key);
        }
        if (integration.bundlingStatus === 'bundled') {
            bundled.push(key);
        }
        if (integration.bundlingStatus === 'unbundled') {
            unbundled.push(key);
        }
    }
    // This will make sure that the disabled cloud mode destinations will be
    // included in the unbundled list.
    for (var _i = 0, _b = (settings === null || settings === void 0 ? void 0 : settings.unbundledIntegrations) || []; _i < _b.length; _i++) {
        var settingsUnbundled = _b[_i];
        if (!unbundled.includes(settingsUnbundled)) {
            unbundled.push(settingsUnbundled);
        }
    }
    var configIds = (_a = settings === null || settings === void 0 ? void 0 : settings.maybeBundledConfigIds) !== null && _a !== void 0 ? _a : {};
    var bundledConfigIds = [];
    bundled.sort().forEach(function (name) {
        var _a;
        ;
        ((_a = configIds[name]) !== null && _a !== void 0 ? _a : []).forEach(function (id) {
            bundledConfigIds.push(id);
        });
    });
    if ((settings === null || settings === void 0 ? void 0 : settings.addBundledMetadata) !== false) {
        json._metadata = __assign(__assign({}, json._metadata), { bundled: bundled.sort(), unbundled: unbundled.sort(), bundledIds: bundledConfigIds });
    }
    return json;
}
//# sourceMappingURL=normalize.js.map