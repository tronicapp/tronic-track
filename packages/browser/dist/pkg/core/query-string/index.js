import { pickPrefix } from './pickPrefix';
import { gracefulDecodeURIComponent } from './gracefulDecodeURIComponent';
import { isPlainObject } from '@tronic/receiver-core';
export function queryString(receiver, query) {
    var a = document.createElement('a');
    a.href = query;
    var parsed = a.search.slice(1);
    var params = parsed.split('&').reduce(function (acc, str) {
        var _a = str.split('='), k = _a[0], v = _a[1];
        acc[k] = gracefulDecodeURIComponent(v);
        return acc;
    }, {});
    var calls = [];
    var rjs_uid = params.rjs_uid, rjs_event = params.rjs_event, rjs_aid = params.rjs_aid;
    var _a = isPlainObject(receiver.options.useQueryString)
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
            var traits = pickPrefix('rjs_trait_', params);
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
        var props = pickPrefix('rjs_prop_', params);
        calls.push(receiver.track(userId, event_1, props));
    }
    return Promise.all(calls);
}
//# sourceMappingURL=index.js.map