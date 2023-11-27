"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fetch_1 = require("../../lib/fetch");
function default_1(config) {
    function dispatch(url, body) {
        return (0, fetch_1.fetch)(url, {
            keepalive: config === null || config === void 0 ? void 0 : config.keepalive,
            headers: {
                // 'Content-Type': 'text/plain',
                'Content-Type': 'application/json',
                'X-Api-Key': '5663b25b-f8c3-4ccb-8f1f-fe891d3d1e9a',
            },
            method: 'post',
            body: JSON.stringify(body),
        });
    }
    return {
        dispatch: dispatch,
    };
}
exports.default = default_1;
//# sourceMappingURL=fetch-dispatcher.js.map