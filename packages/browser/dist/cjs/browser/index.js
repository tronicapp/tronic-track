"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.ReceiverBrowser = exports.loadLegacySettings = void 0;
var parse_cdn_1 = require("../lib/parse-cdn");
var fetch_1 = require("../lib/fetch");
var receiver_1 = require("../core/receiver");
var merged_options_1 = require("../lib/merged-options");
var create_deferred_1 = require("../lib/create-deferred");
var env_enrichment_1 = require("../plugins/env-enrichment");
var remote_loader_1 = require("../plugins/remote-loader");
var tronic_1 = require("../plugins/tronic");
var validation_1 = require("../plugins/validation");
var buffer_1 = require("../core/buffer");
var inspector_1 = require("../core/inspector");
var stats_1 = require("../core/stats");
var global_receiver_helper_1 = require("../lib/global-receiver-helper");
function loadLegacySettings(writeKey, cdnURL) {
    var baseUrl = cdnURL !== null && cdnURL !== void 0 ? cdnURL : (0, parse_cdn_1.getCDN)();
    return (0, fetch_1.fetch)("".concat(baseUrl, "/v1/projects/").concat(writeKey, "/settings"))
        .then(function (res) {
        if (!res.ok) {
            return res.text().then(function (errorResponseMessage) {
                throw new Error(errorResponseMessage);
            });
        }
        return res.json();
    })
        .catch(function (err) {
        console.error(err.message);
        throw err;
    });
}
exports.loadLegacySettings = loadLegacySettings;
/**
 * With AJS classic, we allow users to call setAnonymousId before the library initialization.
 * This is important because some of the destinations will use the anonymousId during the initialization,
 * and if we set anonId afterwards, that wouldn’t impact the destination.
 *
 * Also Ensures events can be registered before library initialization.
 * This is important so users can register to 'initialize' and any events that may fire early during setup.
 */
function flushPreBuffer(receiver, buffer) {
    // flushSetAnonymousID(receiver, buffer)
    (0, buffer_1.flushOn)(receiver, buffer);
}
/**
 * Finish flushing buffer and cleanup.
 */
function flushFinalBuffer(receiver, buffer) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Call popSnippetWindowBuffer before each flush task since there may be
                // receiver calls during async function calls.
                return [4 /*yield*/, (0, buffer_1.flushAddSourceMiddleware)(receiver, buffer)];
                case 1:
                    // Call popSnippetWindowBuffer before each flush task since there may be
                    // receiver calls during async function calls.
                    _a.sent();
                    (0, buffer_1.flushReceiverCallsInNewTask)(receiver, buffer);
                    // Clear buffer, just in case receiver is loaded twice; we don't want to fire events off again.
                    buffer.clear();
                    return [2 /*return*/];
            }
        });
    });
}
function registerPlugins(writeKey, legacySettings, receiver, opts, options, pluginLikes, legacyIntegrationSources) {
    var _a;
    if (pluginLikes === void 0) { pluginLikes = []; }
    return __awaiter(this, void 0, void 0, function () {
        var plugins, pluginSources, mergedSettings, remotePlugins, toRegister, _b, ctx;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    plugins = pluginLikes === null || pluginLikes === void 0 ? void 0 : pluginLikes.filter(function (pluginLike) { return typeof pluginLike === 'object'; });
                    pluginSources = pluginLikes === null || pluginLikes === void 0 ? void 0 : pluginLikes.filter(function (pluginLike) {
                        return typeof pluginLike === 'function' &&
                            typeof pluginLike.pluginName === 'string';
                    });
                    mergedSettings = (0, merged_options_1.mergedOptions)(legacySettings, options);
                    return [4 /*yield*/, (0, remote_loader_1.remoteLoader)(legacySettings, receiver.integrations, mergedSettings, options.obfuscate, undefined, pluginSources).catch(function () { return []; })];
                case 1:
                    remotePlugins = _c.sent();
                    _b = [__spreadArray(__spreadArray([
                            validation_1.validation,
                            env_enrichment_1.envEnrichment
                        ], plugins, true), remotePlugins, true)];
                    return [4 /*yield*/, (0, tronic_1.tronic)(receiver, mergedSettings['Tronic'], 
                        /*
                        {
                          protocol: 'http',
                          apiHost: ,
                          apiKey: writeKey,
                        },
                          */
                        legacySettings.integrations)];
                case 2:
                    toRegister = __spreadArray.apply(void 0, _b.concat([[
                            _c.sent()
                        ], false]));
                    return [4 /*yield*/, receiver.register.apply(receiver, toRegister)];
                case 3:
                    ctx = _c.sent();
                    if (!Object.entries((_a = legacySettings.enabledMiddleware) !== null && _a !== void 0 ? _a : {}).some(function (_a) {
                        var enabled = _a[1];
                        return enabled;
                    })) return [3 /*break*/, 5];
                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(
                        /* webpackChunkName: "remoteMiddleware" */ '../plugins/remote-middleware')); }).then(function (_a) {
                            var remoteMiddlewares = _a.remoteMiddlewares;
                            return __awaiter(_this, void 0, void 0, function () {
                                var middleware, promises;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, remoteMiddlewares(ctx, legacySettings, options.obfuscate)];
                                        case 1:
                                            middleware = _b.sent();
                                            promises = middleware.map(function (mdw) {
                                                return receiver.addSourceMiddleware(mdw);
                                            });
                                            return [2 /*return*/, Promise.all(promises)];
                                    }
                                });
                            });
                        })];
                case 4:
                    _c.sent();
                    _c.label = 5;
                case 5: return [2 /*return*/, ctx];
            }
        });
    });
}
function loadReceiver(settings, options, preInitBuffer) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var legacySettings, retryQueue, opts, receiver, plugins, classicIntegrations, ctx, search, hash, term;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    if (options.globalReceiverKey)
                        (0, global_receiver_helper_1.setGlobalReceiverKey)(options.globalReceiverKey);
                    // this is an ugly side-effect, but it's for the benefits of the plugins that get their cdn via getCDN()
                    if (settings.cdnURL)
                        (0, parse_cdn_1.setGlobalCDNUrl)(settings.cdnURL);
                    legacySettings = {
                        integrations: options.integrations,
                    } /*
                      settings.cdnSettings ??
                      (await loadLegacySettings(settings.writeKey, settings.cdnURL))
                                             */;
                    if (options.updateCDNSettings) {
                        legacySettings = options.updateCDNSettings(legacySettings);
                    }
                    retryQueue = (_c = (_b = (_a = legacySettings === null || legacySettings === void 0 ? void 0 : legacySettings.integrations) === null || _a === void 0 ? void 0 : _a['Segment.io']) === null || _b === void 0 ? void 0 : _b.retryQueue) !== null && _c !== void 0 ? _c : true;
                    opts = __assign({ retryQueue: retryQueue }, options);
                    receiver = new receiver_1.Receiver(settings, opts);
                    (0, inspector_1.attachInspector)(receiver);
                    plugins = (_d = settings.plugins) !== null && _d !== void 0 ? _d : [];
                    classicIntegrations = (_e = settings.classicIntegrations) !== null && _e !== void 0 ? _e : [];
                    stats_1.Stats.initRemoteMetrics(legacySettings.metrics);
                    // needs to be flushed before plugins are registered
                    flushPreBuffer(receiver, preInitBuffer);
                    return [4 /*yield*/, registerPlugins(settings.writeKey, legacySettings, receiver, opts, options, plugins, classicIntegrations)];
                case 1:
                    ctx = _h.sent();
                    search = (_f = window.location.search) !== null && _f !== void 0 ? _f : '';
                    hash = (_g = window.location.hash) !== null && _g !== void 0 ? _g : '';
                    term = search.length ? search : hash.replace(/(?=#).*(?=\?)/, '');
                    if (!term.includes('ajs_')) return [3 /*break*/, 3];
                    return [4 /*yield*/, receiver.queryString(term).catch(console.error)];
                case 2:
                    _h.sent();
                    _h.label = 3;
                case 3:
                    receiver.initialized = true;
                    receiver.emit('initialize', settings, options);
                    /*
                  if (options.initialPageview) {
                    receiver.page().catch(console.error)
                  }
                     */
                    return [4 /*yield*/, flushFinalBuffer(receiver, preInitBuffer)];
                case 4:
                    /*
                  if (options.initialPageview) {
                    receiver.page().catch(console.error)
                  }
                     */
                    _h.sent();
                    return [2 /*return*/, [receiver, ctx]];
            }
        });
    });
}
/**
 * The public browser interface for Tronic Receiver
 *
 * @example
 * ```ts
 *  export const receiver = new ReceiverBrowser()
 *  receiver.load({ writeKey: 'foo' })
 * ```
 * @link https://github.com/tronic/tronic-receiver/#readme
 */
var ReceiverBrowser = /** @class */ (function (_super) {
    __extends(ReceiverBrowser, _super);
    function ReceiverBrowser() {
        var _this = this;
        var _a = (0, create_deferred_1.createDeferred)(), loadStart = _a.promise, resolveLoadStart = _a.resolve;
        _this = _super.call(this, function (buffer) {
            return loadStart.then(function (_a) {
                var settings = _a[0], options = _a[1];
                return loadReceiver(settings, options, buffer);
            });
        }) || this;
        _this._resolveLoadStart = function (settings, options) {
            return resolveLoadStart([settings, options]);
        };
        return _this;
    }
    /**
     * Fully initialize an receiver instance, including:
     *
     * * Fetching settings from the Tronic CDN (by default).
     * * Fetching all remote destinations configured by the user (if applicable).
     * * Flushing buffered receiver events.
     * * Loading all middleware.
     *
     * Note:️  This method should only be called *once* in your application.
     *
     * @example
     * ```ts
     * export const receiver = new ReceiverBrowser()
     * receiver.load({ writeKey: 'foo' })
     * ```
     */
    ReceiverBrowser.prototype.load = function (settings, options) {
        if (options === void 0) { options = {}; }
        this._resolveLoadStart(settings, options);
        return this;
    };
    /**
     * Instantiates an object exposing Receiver methods.
     *
     * @example
     * ```ts
     * const ajs = ReceiverBrowser.load({ writeKey: '<YOUR_WRITE_KEY>' })
     *
     * ajs.track("foo")
     * ...
     * ```
     */
    ReceiverBrowser.load = function (settings, options) {
        if (options === void 0) { options = {}; }
        return new ReceiverBrowser().load(settings, options);
    };
    ReceiverBrowser.standalone = function (writeKey, options) {
        return ReceiverBrowser.load({ writeKey: writeKey }, options).then(function (res) { return res[0]; });
    };
    return ReceiverBrowser;
}(buffer_1.ReceiverBuffered));
exports.ReceiverBrowser = ReceiverBrowser;
//# sourceMappingURL=index.js.map