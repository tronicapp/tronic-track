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
exports.mergedOptions = void 0;
/**
 * Merge legacy settings and initialized Integration option overrides.
 *
 * This will merge any options that were passed from initialization into
 * overrides for settings that are returned by the Tronic CDN.
 *
 * i.e. this allows for passing options directly into destinations from
 * the Receiver constructor.
 */
function mergedOptions(settings, options) {
    var _a;
    var optionOverrides = Object.entries((_a = options.integrations) !== null && _a !== void 0 ? _a : {}).reduce(function (overrides, _a) {
        var _b, _c;
        var integration = _a[0], options = _a[1];
        if (typeof options === 'object') {
            return __assign(__assign({}, overrides), (_b = {}, _b[integration] = options, _b));
        }
        return __assign(__assign({}, overrides), (_c = {}, _c[integration] = {}, _c));
    }, {});
    return Object.entries(settings.integrations).reduce(function (integrationSettings, _a) {
        var _b;
        var integration = _a[0], settings = _a[1];
        return __assign(__assign({}, integrationSettings), (_b = {}, _b[integration] = __assign(__assign({}, settings), optionOverrides[integration]), _b));
    }, {});
}
exports.mergedOptions = mergedOptions;
//# sourceMappingURL=merged-options.js.map