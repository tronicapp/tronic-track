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
import { loadScript } from '../../lib/load-script';
import { getCDN } from '../../lib/parse-cdn';
import { applyDestinationMiddleware, } from '../middleware';
import { Context, ContextCancelation } from '../../core/context';
var ActionDestination = /** @class */ (function () {
    function ActionDestination(name, action) {
        this.version = '1.0.0';
        this.alternativeNames = [];
        this.middleware = [];
        this.identify = this._createMethod('identify');
        this.track = this._createMethod('track');
        this.action = action;
        this.name = name;
        this.type = action.type;
        this.alternativeNames.push(action.name);
    }
    ActionDestination.prototype.addMiddleware = function () {
        var _a;
        var fn = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fn[_i] = arguments[_i];
        }
        if (this.type === 'destination') {
            (_a = this.middleware).push.apply(_a, fn);
        }
    };
    ActionDestination.prototype.transform = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var modifiedEvent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, applyDestinationMiddleware(this.name, ctx.event, this.middleware)];
                    case 1:
                        modifiedEvent = _a.sent();
                        if (modifiedEvent === null) {
                            ctx.cancel(new ContextCancelation({
                                retry: false,
                                reason: 'dropped by destination middleware',
                            }));
                        }
                        return [2 /*return*/, new Context(modifiedEvent)];
                }
            });
        });
    };
    ActionDestination.prototype._createMethod = function (methodName) {
        var _this = this;
        return function (ctx) { return __awaiter(_this, void 0, void 0, function () {
            var transformedContext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.action[methodName])
                            return [2 /*return*/, ctx];
                        transformedContext = ctx;
                        if (!(this.type === 'destination')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.transform(ctx)];
                    case 1:
                        transformedContext = _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.action[methodName](transformedContext)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, ctx];
                }
            });
        }); };
    };
    /* --- PASSTHROUGH METHODS --- */
    ActionDestination.prototype.isLoaded = function () {
        return this.action.isLoaded();
    };
    ActionDestination.prototype.ready = function () {
        return this.action.ready ? this.action.ready() : Promise.resolve();
    };
    ActionDestination.prototype.load = function (ctx, receiver) {
        return this.action.load(ctx, receiver);
    };
    ActionDestination.prototype.unload = function (ctx, receiver) {
        var _a, _b;
        return (_b = (_a = this.action).unload) === null || _b === void 0 ? void 0 : _b.call(_a, ctx, receiver);
    };
    return ActionDestination;
}());
export { ActionDestination };
function validate(pluginLike) {
    if (!Array.isArray(pluginLike)) {
        throw new Error('Not a valid list of plugins');
    }
    var required = ['load', 'isLoaded', 'name', 'version', 'type'];
    pluginLike.forEach(function (plugin) {
        required.forEach(function (method) {
            var _a;
            if (plugin[method] === undefined) {
                throw new Error("Plugin: ".concat((_a = plugin.name) !== null && _a !== void 0 ? _a : 'unknown', " missing required function ").concat(method));
            }
        });
    });
    return true;
}
function isPluginDisabled(userIntegrations, remotePlugin) {
    var creationNameEnabled = userIntegrations[remotePlugin.creationName];
    var currentNameEnabled = userIntegrations[remotePlugin.name];
    // Check that the plugin isn't explicitly enabled when All: false
    if (userIntegrations.All === false &&
        !creationNameEnabled &&
        !currentNameEnabled) {
        return true;
    }
    // Check that the plugin isn't explicitly disabled
    if (creationNameEnabled === false || currentNameEnabled === false) {
        return true;
    }
    return false;
}
function loadPluginFactory(remotePlugin, obfuscate) {
    return __awaiter(this, void 0, void 0, function () {
        var defaultCdn, cdn, urlSplit, name_1, obfuscatedURL, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    defaultCdn = new RegExp('https://cdn.tronic.(com|build)');
                    cdn = getCDN();
                    if (!obfuscate) return [3 /*break*/, 6];
                    urlSplit = remotePlugin.url.split('/');
                    name_1 = urlSplit[urlSplit.length - 2];
                    obfuscatedURL = remotePlugin.url.replace(name_1, btoa(name_1).replace(/=/g, ''));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 5]);
                    return [4 /*yield*/, loadScript(obfuscatedURL.replace(defaultCdn, cdn))];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    // Due to syncing concerns it is possible that the obfuscated action destination (or requested version) might not exist.
                    // We should use the unobfuscated version as a fallback.
                    return [4 /*yield*/, loadScript(remotePlugin.url.replace(defaultCdn, cdn))];
                case 4:
                    // Due to syncing concerns it is possible that the obfuscated action destination (or requested version) might not exist.
                    // We should use the unobfuscated version as a fallback.
                    _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, loadScript(remotePlugin.url.replace(defaultCdn, cdn))];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    // @ts-expect-error
                    if (typeof window[remotePlugin.libraryName] === 'function') {
                        // @ts-expect-error
                        return [2 /*return*/, window[remotePlugin.libraryName]];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
export function remoteLoader(settings, userIntegrations, mergedIntegrations, obfuscate, routingMiddleware, pluginSources) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var allPlugins, routingRules, pluginPromises;
        var _this = this;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    allPlugins = [];
                    routingRules = (_b = (_a = settings.middlewareSettings) === null || _a === void 0 ? void 0 : _a.routingRules) !== null && _b !== void 0 ? _b : [];
                    pluginPromises = ((_c = settings.remotePlugins) !== null && _c !== void 0 ? _c : []).map(function (remotePlugin) { return __awaiter(_this, void 0, void 0, function () {
                        var pluginFactory, _a, plugin, plugins, routing_1, error_2;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (isPluginDisabled(userIntegrations, remotePlugin))
                                        return [2 /*return*/];
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 6, , 7]);
                                    _a = (pluginSources === null || pluginSources === void 0 ? void 0 : pluginSources.find(function (_a) {
                                        var pluginName = _a.pluginName;
                                        return pluginName === remotePlugin.name;
                                    }));
                                    if (_a) return [3 /*break*/, 3];
                                    return [4 /*yield*/, loadPluginFactory(remotePlugin, obfuscate)];
                                case 2:
                                    _a = (_b.sent());
                                    _b.label = 3;
                                case 3:
                                    pluginFactory = _a;
                                    if (!pluginFactory) return [3 /*break*/, 5];
                                    return [4 /*yield*/, pluginFactory(__assign(__assign({}, remotePlugin.settings), mergedIntegrations[remotePlugin.name]))];
                                case 4:
                                    plugin = _b.sent();
                                    plugins = Array.isArray(plugin) ? plugin : [plugin];
                                    validate(plugins);
                                    routing_1 = routingRules.filter(function (rule) { return rule.destinationName === remotePlugin.creationName; });
                                    plugins.forEach(function (plugin) {
                                        var wrapper = new ActionDestination(remotePlugin.creationName, plugin);
                                        /** Make sure we only apply destination filters to actions of the "destination" type to avoid causing issues for hybrid destinations */
                                        if (routing_1.length &&
                                            routingMiddleware &&
                                            plugin.type === 'destination') {
                                            wrapper.addMiddleware(routingMiddleware);
                                        }
                                        allPlugins.push(wrapper);
                                    });
                                    _b.label = 5;
                                case 5: return [3 /*break*/, 7];
                                case 6:
                                    error_2 = _b.sent();
                                    console.warn('Failed to load Remote Plugin', error_2);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(pluginPromises)];
                case 1:
                    _d.sent();
                    return [2 /*return*/, allPlugins.filter(Boolean)];
            }
        });
    });
}
//# sourceMappingURL=index.js.map