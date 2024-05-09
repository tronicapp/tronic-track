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
import { fetch } from "../../lib/fetch";
export default function (writeKey, config) {
    function dispatch(url, body) {
        return fetch(url, {
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
//# sourceMappingURL=fetch-dispatcher.js.map