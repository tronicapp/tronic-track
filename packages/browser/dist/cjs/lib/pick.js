"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = void 0;
/**
 * @example
 * pick({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c'])
 * => { 'a': 1, 'c': 3 }
 */
function pick(object, keys) {
    return Object.assign.apply(Object, __spreadArray([{}], keys.map(function (key) {
        var _a;
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            return _a = {}, _a[key] = object[key], _a;
        }
    }), false));
}
exports.pick = pick;
//# sourceMappingURL=pick.js.map