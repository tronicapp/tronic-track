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
import { isServer } from '../../core/environment';
import { loadScript } from '../../lib/load-script';
import { getNextIntegrationsURL } from '../../lib/parse-cdn';
export function remoteMiddlewares(ctx, settings, obfuscate) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var path, remoteMiddleware, names, scripts, middleware;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (isServer()) {
                        return [2 /*return*/, []];
                    }
                    path = getNextIntegrationsURL();
                    remoteMiddleware = (_a = settings.enabledMiddleware) !== null && _a !== void 0 ? _a : {};
                    names = Object.entries(remoteMiddleware)
                        .filter(function (_a) {
                        var _ = _a[0], enabled = _a[1];
                        return enabled;
                    })
                        .map(function (_a) {
                        var name = _a[0];
                        return name;
                    });
                    scripts = names.map(function (name) { return __awaiter(_this, void 0, void 0, function () {
                        var nonNamespaced, bundleName, fullPath, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    nonNamespaced = name.replace('@tronic/', '');
                                    bundleName = nonNamespaced;
                                    if (obfuscate) {
                                        bundleName = btoa(nonNamespaced).replace(/=/g, '');
                                    }
                                    fullPath = "".concat(path, "/middleware/").concat(bundleName, "/latest/").concat(bundleName, ".js.gz");
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, loadScript(fullPath)
                                        // @ts-ignore
                                    ];
                                case 2:
                                    _a.sent();
                                    // @ts-ignore
                                    return [2 /*return*/, window["".concat(nonNamespaced, "Middleware")]];
                                case 3:
                                    error_1 = _a.sent();
                                    ctx.log('error', error_1);
                                    ctx.stats.increment('failed_remote_middleware');
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(scripts)];
                case 1:
                    middleware = _b.sent();
                    middleware = middleware.filter(Boolean);
                    return [2 /*return*/, middleware];
            }
        });
    });
}
//# sourceMappingURL=index.js.map