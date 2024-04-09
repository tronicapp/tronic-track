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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Receiver = void 0;
var arguments_resolver_1 = require("../arguments-resolver");
var connection_1 = require("../connection");
var context_1 = require("../context");
var receiver_core_1 = require("@tronic/receiver-core");
var events_1 = require("../events");
var event_queue_1 = require("../queue/event-queue");
var user_1 = require("../user");
var bind_all_1 = __importDefault(require("../../lib/bind-all"));
var persisted_1 = require("../../lib/priority-queue/persisted");
var version_1 = require("../../generated/version");
var priority_queue_1 = require("../../lib/priority-queue");
var get_global_1 = require("../../lib/get-global");
// import type { ExternalSettings } from '../../browser'
var storage_1 = require("../storage");
// import { setGlobalReceiver } from '../../lib/global-receiver-helper'
var buffer_1 = require("../buffer");
var deprecationWarning = 'This is being deprecated and will be not be available in future releases of Receiver JS';
// reference any pre-existing "receiver" object so a user can restore the reference
var global = (0, get_global_1.getGlobal)();
var _receiver = global === null || global === void 0 ? void 0 : global.receiver;
function createDefaultQueue(name, retryQueue, disablePersistance) {
    if (retryQueue === void 0) { retryQueue = false; }
    if (disablePersistance === void 0) { disablePersistance = false; }
    var maxAttempts = retryQueue ? 4 : 1;
    var priorityQueue = disablePersistance
        ? new priority_queue_1.PriorityQueue(maxAttempts, [])
        : new persisted_1.PersistedPriorityQueue(maxAttempts, name);
    return new event_queue_1.EventQueue(priorityQueue);
}
var Receiver = /** @class */ (function (_super) {
    __extends(Receiver, _super);
    function Receiver(
    // settings: ReceiverSettings,
    options, queue, user, group) {
        var _a;
        var _this = _super.call(this) || this;
        _this._debug = false;
        _this.initialized = false;
        _this.user = function () {
            return _this._user;
        };
        var cookieOptions = options === null || options === void 0 ? void 0 : options.cookie;
        var disablePersistance = (_a = options === null || options === void 0 ? void 0 : options.disableClientPersistence) !== null && _a !== void 0 ? _a : false;
        // this.settings = settings
        // this.settings.timeout = this.settings.timeout ?? 300
        _this.queue =
            queue !== null && queue !== void 0 ? queue : createDefaultQueue("".concat(options.writeKey, ":event-queue"), options === null || options === void 0 ? void 0 : options.retryQueue, disablePersistance);
        var storageSetting = options === null || options === void 0 ? void 0 : options.storage;
        _this._universalStorage = _this.createStore(disablePersistance, storageSetting, cookieOptions);
        _this._user =
            user !== null && user !== void 0 ? user : new user_1.User(__assign({ persist: !disablePersistance, storage: options === null || options === void 0 ? void 0 : options.storage }, options === null || options === void 0 ? void 0 : options.user), cookieOptions).load();
        _this._group =
            group !== null && group !== void 0 ? group : new user_1.Group(__assign({ persist: !disablePersistance, storage: options === null || options === void 0 ? void 0 : options.storage }, options === null || options === void 0 ? void 0 : options.group), cookieOptions).load();
        _this.eventFactory = new events_1.EventFactory(_this._user);
        // this.integrations = options?.integrations ?? {}
        _this.options = options; // ?? {}
        (0, bind_all_1.default)(_this);
        return _this;
    }
    // Creates the storage system based on the settings received
    Receiver.prototype.createStore = function (disablePersistance, storageSetting, cookieOptions) {
        // DisablePersistance option overrides all, no storage will be used outside of memory even if specified
        if (disablePersistance) {
            return new storage_1.UniversalStorage([new storage_1.MemoryStorage()]);
        }
        else {
            if (storageSetting) {
                if ((0, storage_1.isArrayOfStoreType)(storageSetting)) {
                    // We will create the store with the priority for customer settings
                    return new storage_1.UniversalStorage((0, storage_1.initializeStorages)((0, storage_1.applyCookieOptions)(storageSetting.stores, cookieOptions)));
                }
            }
        }
        // We default to our multi storage with priority
        return new storage_1.UniversalStorage((0, storage_1.initializeStorages)([
            storage_1.StoreType.LocalStorage,
            {
                name: storage_1.StoreType.Cookie,
                settings: cookieOptions,
            },
            storage_1.StoreType.Memory,
        ]));
    };
    Object.defineProperty(Receiver.prototype, "storage", {
        get: function () {
            return this._universalStorage;
        },
        enumerable: false,
        configurable: true
    });
    Receiver.prototype.track = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var pageCtx, _a, name, data, opts, cb, tronicEvent;
            var _this = this;
            return __generator(this, function (_b) {
                pageCtx = (0, buffer_1.popPageContext)(args);
                _a = arguments_resolver_1.resolveArguments.apply(void 0, args), name = _a[0], data = _a[1], opts = _a[2], cb = _a[3];
                tronicEvent = this.eventFactory.track(name, 
                // channelId,
                data, opts, pageCtx);
                return [2 /*return*/, this._dispatch(tronicEvent, cb).then(function (ctx) {
                        _this.emit('track', name, ctx.event.properties, ctx.event.options);
                        return ctx;
                    })];
            });
        });
    };
    Receiver.prototype.identify = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var pageCtx, _a, id, _traits, options, callback, tronicEvent;
            var _this = this;
            return __generator(this, function (_b) {
                pageCtx = (0, buffer_1.popPageContext)(args);
                _a = (0, arguments_resolver_1.resolveUserArguments)(this._user).apply(void 0, args), id = _a[0], _traits = _a[1], options = _a[2], callback = _a[3];
                this._user.identify(id, _traits);
                tronicEvent = this.eventFactory.identify(this._user.id(), 
                // channelId,
                this._user.traits(), options, pageCtx);
                return [2 /*return*/, this._dispatch(tronicEvent, callback).then(function (ctx) {
                        _this.emit('identify', ctx.event.userId, ctx.event.traits, ctx.event.options);
                        return ctx;
                    })];
            });
        });
    };
    Receiver.prototype.trackClick = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var autotrack;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(
                        /* webpackChunkName: "auto-track" */ '../auto-track')); })];
                    case 1:
                        autotrack = _b.sent();
                        return [2 /*return*/, (_a = autotrack.link).call.apply(_a, __spreadArray([this], args, false))];
                }
            });
        });
    };
    Receiver.prototype.trackLink = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var autotrack;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(
                        /* webpackChunkName: "auto-track" */ '../auto-track')); })];
                    case 1:
                        autotrack = _b.sent();
                        return [2 /*return*/, (_a = autotrack.link).call.apply(_a, __spreadArray([this], args, false))];
                }
            });
        });
    };
    Receiver.prototype.trackSubmit = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var autotrack;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(
                        /* webpackChunkName: "auto-track" */ '../auto-track')); })];
                    case 1:
                        autotrack = _b.sent();
                        return [2 /*return*/, (_a = autotrack.form).call.apply(_a, __spreadArray([this], args, false))];
                }
            });
        });
    };
    Receiver.prototype.trackForm = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var autotrack;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(
                        /* webpackChunkName: "auto-track" */ '../auto-track')); })];
                    case 1:
                        autotrack = _b.sent();
                        return [2 /*return*/, (_a = autotrack.form).call.apply(_a, __spreadArray([this], args, false))];
                }
            });
        });
    };
    Receiver.prototype.register = function () {
        var plugins = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            plugins[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var ctx, registrations;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = context_1.Context.system();
                        registrations = plugins.map(function (xt) {
                            return _this.queue.register(ctx, xt, _this);
                        });
                        return [4 /*yield*/, Promise.all(registrations)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, ctx];
                }
            });
        });
    };
    Receiver.prototype.deregister = function () {
        var plugins = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            plugins[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var ctx, deregistrations;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = context_1.Context.system();
                        deregistrations = plugins.map(function (pl) {
                            var plugin = _this.queue.plugins.find(function (p) { return p.name === pl; });
                            if (plugin) {
                                return _this.queue.deregister(ctx, plugin, _this);
                            }
                            else {
                                ctx.log('warn', "plugin ".concat(pl, " not found"));
                            }
                        });
                        return [4 /*yield*/, Promise.all(deregistrations)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, ctx];
                }
            });
        });
    };
    Receiver.prototype.debug = function (toggle) {
        // Make sure legacy ajs debug gets turned off if it was enabled before upgrading.
        if (toggle === false && localStorage.getItem('debug')) {
            localStorage.removeItem('debug');
        }
        this._debug = toggle;
        return this;
    };
    Receiver.prototype.reset = function () {
        this._user.reset();
        this._group.reset();
        this.emit('reset');
    };
    Receiver.prototype.timeout = function (timeout) {
        this.options.timeout = timeout;
    };
    Receiver.prototype._dispatch = function (event, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx;
            return __generator(this, function (_a) {
                ctx = new context_1.Context(event);
                if ((0, connection_1.isOffline)() && !this.options.retryQueue) {
                    return [2 /*return*/, ctx];
                }
                return [2 /*return*/, (0, receiver_core_1.dispatch)(ctx, this.queue, this, {
                        callback: callback,
                        debug: this._debug,
                        timeout: this.options.timeout,
                    })];
            });
        });
    };
    Receiver.prototype.addSourceMiddleware = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.queue.criticalTasks.run(function () { return __awaiter(_this, void 0, void 0, function () {
                            var sourceMiddlewarePlugin, plugin;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(
                                        /* webpackChunkName: "middleware" */ '../../plugins/middleware')); })];
                                    case 1:
                                        sourceMiddlewarePlugin = (_a.sent()).sourceMiddlewarePlugin;
                                        plugin = sourceMiddlewarePlugin(fn) //, integrations)
                                        ;
                                        return [4 /*yield*/, this.register(plugin)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    // TODO: This does not have to return a promise?
    Receiver.prototype.addDestinationMiddleware = function (integrationName) {
        var middlewares = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            middlewares[_i - 1] = arguments[_i];
        }
        var legacyDestinations = this.queue.plugins.filter(function (xt) { return xt.name.toLowerCase() === integrationName.toLowerCase(); });
        legacyDestinations.forEach(function (destination) {
            destination.addMiddleware.apply(destination, middlewares);
        });
        return Promise.resolve(this);
    };
    Receiver.prototype.setAnonymousId = function (id) {
        return this._user.anonymousId(id);
    };
    Receiver.prototype.queryString = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var queryString;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.options.useQueryString === false) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(
                            /* webpackChunkName: "queryString" */ '../query-string')); })];
                    case 1:
                        queryString = (_a.sent()).queryString;
                        return [2 /*return*/, queryString(this, query)];
                }
            });
        });
    };
    Receiver.prototype.ready = function (callback) {
        if (callback === void 0) { callback = function (res) { return res; }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all(this.queue.plugins.map(function (i) { return (i.ready ? i.ready() : Promise.resolve()); })).then(function (res) {
                        callback(res);
                        return res;
                    })];
            });
        });
    };
    Object.defineProperty(Receiver.prototype, "VERSION", {
        get: function () {
            return version_1.version;
        },
        enumerable: false,
        configurable: true
    });
    // snippet function
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Receiver.prototype.push = function (args) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var an = this;
        var method = args.shift();
        if (method) {
            if (!an[method])
                return;
        }
        an[method].apply(this, args);
    };
    return Receiver;
}(receiver_core_1.Emitter));
exports.Receiver = Receiver;
//# sourceMappingURL=index.js.map