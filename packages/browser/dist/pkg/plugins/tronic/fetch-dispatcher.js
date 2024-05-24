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
            body: JSON.stringify(body),
        });
    }
    return {
        dispatch: dispatch,
    };
}
//# sourceMappingURL=fetch-dispatcher.js.map