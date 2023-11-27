import { fetch } from '../../lib/fetch';
export default function (config) {
    function dispatch(url, body) {
        return fetch(url, {
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
//# sourceMappingURL=fetch-dispatcher.js.map