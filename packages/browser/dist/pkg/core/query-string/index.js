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
    var ajs_uid = params.ajs_uid, ajs_event = params.ajs_event, ajs_aid = params.ajs_aid;
    var _a = isPlainObject(receiver.options.useQueryString)
        ? receiver.options.useQueryString
        : {}, _b = _a.aid, aidPattern = _b === void 0 ? /.+/ : _b, _c = _a.uid, uidPattern = _c === void 0 ? /.+/ : _c;
    if (ajs_aid) {
        var anonId = Array.isArray(params.ajs_aid)
            ? params.ajs_aid[0]
            : params.ajs_aid;
        if (aidPattern.test(anonId)) {
            receiver.setAnonymousId(anonId);
        }
    }
    if (ajs_uid) {
        var uid = Array.isArray(params.ajs_uid)
            ? params.ajs_uid[0]
            : params.ajs_uid;
        if (uidPattern.test(uid)) {
            var traits = pickPrefix('ajs_trait_', params);
            // requires channelId
            // calls.push(receiver.identify(uid, traits))
        }
    }
    if (ajs_event) {
        var channelId = Array.isArray(params.ajs_channel_id)
            ? params.ajs_channel_id[0]
            : params.ajs_channel_id;
        var userId = Array.isArray(params.ajs_user_id)
            ? params.ajs_user_id[0]
            : params.ajs_user_id;
        var event_1 = Array.isArray(params.ajs_event)
            ? params.ajs_event[0]
            : params.ajs_event;
        var props = pickPrefix('ajs_prop_', params);
        calls.push(receiver.track(channelId, userId, event_1, props));
    }
    return Promise.all(calls);
}
//# sourceMappingURL=index.js.map