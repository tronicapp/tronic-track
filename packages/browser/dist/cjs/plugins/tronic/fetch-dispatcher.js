"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var fetch_1 = require("../../lib/fetch");
function default_1(writeKey, config) {
    function dispatch(url, body) {
        return (0, fetch_1.fetch)(url, {
            keepalive: config === null || config === void 0 ? void 0 : config.keepalive,
            headers: {
                // 'Content-Type': 'text/plain',
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(__assign(__assign({}, body), { write_key: writeKey })),
        });
    }
    return {
        dispatch: dispatch,
    };
}
exports.default = default_1;
//# sourceMappingURL=fetch-dispatcher.js.map