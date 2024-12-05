"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryString = void 0;
var pickPrefix_1 = require("./pickPrefix");
var gracefulDecodeURIComponent_1 = require("./gracefulDecodeURIComponent");
var receiver_core_1 = require("@tronic/receiver-core");
function queryString(receiver, query) {
    var a = document.createElement('a');
    a.href = query;
    var parsed = a.search.slice(1);
    var params = parsed.split('&').reduce(function (acc, str) {
        var _a = str.split('='), k = _a[0], v = _a[1];
        acc[k] = (0, gracefulDecodeURIComponent_1.gracefulDecodeURIComponent)(v);
        return acc;
    }, {});
    var calls = [];
    var rjs_uid = params.rjs_uid, rjs_event = params.rjs_event, rjs_aid = params.rjs_aid;
    var _a = (0, receiver_core_1.isPlainObject)(receiver.options.useQueryString)
        ? receiver.options.useQueryString
        : {}, _b = _a.aid, aidPattern = _b === void 0 ? /.+/ : _b, _c = _a.uid, uidPattern = _c === void 0 ? /.+/ : _c;
    if (rjs_aid) {
        var anonId = Array.isArray(params.rjs_aid)
            ? params.rjs_aid[0]
            : params.rjs_aid;
        if (aidPattern.test(anonId)) {
            receiver.setAnonymousId(anonId);
        }
    }
    if (rjs_uid) {
        var uid = Array.isArray(params.rjs_uid)
            ? params.rjs_uid[0]
            : params.rjs_uid;
        if (uidPattern.test(uid)) {
            var traits = (0, pickPrefix_1.pickPrefix)('rjs_trait_', params);
            calls.push(receiver.identify(uid, traits));
        }
    }
    if (rjs_event) {
        var userId = Array.isArray(params.rjs_user_id)
            ? params.rjs_user_id[0]
            : params.rjs_user_id;
        var event_1 = Array.isArray(params.rjs_event)
            ? params.rjs_event[0]
            : params.rjs_event;
        var props = (0, pickPrefix_1.pickPrefix)('rjs_prop_', params);
        calls.push(receiver.track(userId, event_1, props));
    }
    return Promise.all(calls);
}
exports.queryString = queryString;
//# sourceMappingURL=index.js.map