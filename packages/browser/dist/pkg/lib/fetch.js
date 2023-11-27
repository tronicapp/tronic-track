import unfetch from 'unfetch';
import { getGlobal } from './get-global';
/**
 * Wrapper around native `fetch` containing `unfetch` fallback.
 */
// @ts-ignore
export var fetch = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var global = getGlobal();
    // @ts-ignore
    return ((global && global.fetch) || unfetch).apply(void 0, args);
};
//# sourceMappingURL=fetch.js.map