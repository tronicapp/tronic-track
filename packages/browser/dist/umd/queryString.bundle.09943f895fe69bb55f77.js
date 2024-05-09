"use strict";
(self["webpackChunk_tronic_receiver_browser"] = self["webpackChunk_tronic_receiver_browser"] || []).push([[96],{

/***/ 473:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  queryString: function() { return /* binding */ queryString; }
});

;// CONCATENATED MODULE: ./src/core/query-string/pickPrefix.ts
/**
 * Returns an object containing only the properties prefixed by the input
 * string.
 * Ex: prefix('ajs_traits_', { ajs_traits_address: '123 St' })
 * will return { address: '123 St' }
 **/
function pickPrefix(prefix, object) {
    return Object.keys(object).reduce(function (acc, key) {
        if (key.startsWith(prefix)) {
            var field = key.substr(prefix.length);
            acc[field] = object[key];
        }
        return acc;
    }, {});
}

// EXTERNAL MODULE: ./src/core/query-string/gracefulDecodeURIComponent.ts
var gracefulDecodeURIComponent = __webpack_require__(863);
// EXTERNAL MODULE: ../core/dist/esm/validation/helpers.js
var helpers = __webpack_require__(595);
;// CONCATENATED MODULE: ./src/core/query-string/index.ts



function queryString(receiver, query) {
    var a = document.createElement('a');
    a.href = query;
    var parsed = a.search.slice(1);
    var params = parsed.split('&').reduce(function (acc, str) {
        var _a = str.split('='), k = _a[0], v = _a[1];
        acc[k] = (0,gracefulDecodeURIComponent/* gracefulDecodeURIComponent */.a)(v);
        return acc;
    }, {});
    var calls = [];
    var rjs_uid = params.rjs_uid, rjs_event = params.rjs_event, rjs_aid = params.rjs_aid;
    var _a = (0,helpers/* isPlainObject */.PO)(receiver.options.useQueryString)
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
            // requires channelId
            // calls.push(receiver.identify(uid, traits))
        }
    }
    if (rjs_event) {
        var channelId = Array.isArray(params.rjs_channel_id)
            ? params.rjs_channel_id[0]
            : params.rjs_channel_id;
        var userId = Array.isArray(params.rjs_user_id)
            ? params.rjs_user_id[0]
            : params.rjs_user_id;
        var event = Array.isArray(params.rjs_event)
            ? params.rjs_event[0]
            : params.rjs_event;
        var props = pickPrefix('rjs_prop_', params);
        calls.push(receiver.track(channelId, userId, event, props));
    }
    return Promise.all(calls);
}


/***/ })

}]);
//# sourceMappingURL=queryString.bundle.09943f895fe69bb55f77.js.map