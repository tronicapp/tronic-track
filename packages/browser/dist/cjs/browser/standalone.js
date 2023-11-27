"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
/* eslint-disable @typescript-eslint/no-floating-promises */
var parse_cdn_1 = require("../lib/parse-cdn");
var version_type_1 = require("../lib/version-type");
if (process.env.ASSET_PATH) {
    if (process.env.ASSET_PATH === '/dist/umd/') {
        // @ts-ignore
        __webpack_public_path__ = '/dist/umd/';
    }
    else {
        var cdn = (0, parse_cdn_1.getCDN)();
        (0, parse_cdn_1.setGlobalCDNUrl)(cdn);
        // @ts-ignore
        __webpack_public_path__ = cdn
            ? cdn + '/tronic-receiver/bundles/'
            : 'https://cdn.tronic.com/tronic-receiver/bundles/';
    }
}
(0, version_type_1.setVersionType)('web');
var standalone_receiver_1 = require("./standalone-receiver");
require("../lib/csp-detection");
var browser_polyfill_1 = require("../lib/browser-polyfill");
var remote_metrics_1 = require("../core/stats/remote-metrics");
var embedded_write_key_1 = require("../lib/embedded-write-key");
var csp_detection_1 = require("../lib/csp-detection");
var ajsIdentifiedCSP = false;
var sendErrorMetrics = function (tags) {
    // this should not be instantied at the root, or it will break ie11.
    var metrics = new remote_metrics_1.RemoteMetrics();
    metrics.increment('receiver_js.invoke.error', __spreadArray(__spreadArray([], tags, true), [
        "wk:".concat((0, embedded_write_key_1.embeddedWriteKey)()),
    ], false));
};
function onError(err) {
    console.error('[receiver.js]', 'Failed to load Receiver.js', err);
    sendErrorMetrics(__spreadArray([
        'type:initialization'
    ], (err instanceof Error
        ? ["message:".concat(err === null || err === void 0 ? void 0 : err.message), "name:".concat(err === null || err === void 0 ? void 0 : err.name)]
        : []), true));
}
document.addEventListener('securitypolicyviolation', function (e) {
    if (ajsIdentifiedCSP || !(0, csp_detection_1.isReceiverCSPError)(e)) {
        return;
    }
    ajsIdentifiedCSP = true;
    sendErrorMetrics(['type:csp']);
    (0, csp_detection_1.loadAjsClassicFallback)().catch(console.error);
});
/**
 * Attempts to run a promise and catch both sync and async errors.
 **/
function attempt(promise) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, promise()];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_1 = _a.sent();
                    onError(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
if ((0, browser_polyfill_1.shouldPolyfill)()) {
    // load polyfills in order to get AJS to work with old browsers
    var script_1 = document.createElement('script');
    script_1.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.7.0/polyfill.min.js');
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            return document.body.appendChild(script_1);
        });
    }
    else {
        document.body.appendChild(script_1);
    }
    script_1.onload = function () {
        attempt(standalone_receiver_1.install);
    };
}
else {
    attempt(standalone_receiver_1.install);
}
//# sourceMappingURL=standalone.js.map