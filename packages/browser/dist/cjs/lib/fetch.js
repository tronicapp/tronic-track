"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch = void 0;
var unfetch_1 = __importDefault(require("unfetch"));
var get_global_1 = require("./get-global");
/**
 * Wrapper around native `fetch` containing `unfetch` fallback.
 */
// @ts-ignore
var fetch = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var global = (0, get_global_1.getGlobal)();
    // @ts-ignore
    return ((global && global.fetch) || unfetch_1.default).apply(void 0, args);
};
exports.fetch = fetch;
//# sourceMappingURL=fetch.js.map