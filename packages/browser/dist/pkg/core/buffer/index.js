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
import { isThenable } from '../../lib/is-thenable';
import { version } from '../../generated/version';
import { getGlobalReceiver } from '../../lib/global-receiver-helper';
import { isBufferedPageContext, getDefaultBufferedPageContext, createPageContext, } from '../page';
var flushSyncReceiverCalls = function (name, receiver, buffer) {
    buffer.getCalls(name).forEach(function (c) {
        // While the underlying methods are synchronous, the callReceiverMethod returns a promise,
        // which normalizes success and error states between async and non-async methods, with no perf penalty.
        callReceiverMethod(receiver, c).catch(console.error);
    });
};
export var flushAddSourceMiddleware = function (receiver, buffer) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, _a, c;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _i = 0, _a = buffer.getCalls('addSourceMiddleware');
                _b.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 4];
                c = _a[_i];
                return [4 /*yield*/, callReceiverMethod(receiver, c).catch(console.error)];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var flushOn = flushSyncReceiverCalls.bind(this, 'on');
/*
export const flushSetAnonymousID = flushSyncReceiverCalls.bind(
  this,
  'setAnonymousId'
)
 */
export var flushReceiverCallsInNewTask = function (receiver, buffer) {
    buffer.toArray().forEach(function (m) {
        setTimeout(function () {
            callReceiverMethod(receiver, m).catch(console.error);
        }, 0);
    });
};
export var popPageContext = function (args) {
    if (hasBufferedPageContextAsLastArg(args)) {
        var ctx = args.pop();
        return createPageContext(ctx);
    }
};
export var hasBufferedPageContextAsLastArg = function (args) {
    var lastArg = args[args.length - 1];
    return isBufferedPageContext(lastArg);
};
/**
 *  Represents a buffered method call that occurred before initialization.
 */
var PreInitMethodCall = /** @class */ (function () {
    function PreInitMethodCall(method, args, resolve, reject) {
        if (resolve === void 0) { resolve = function () { }; }
        if (reject === void 0) { reject = console.error; }
        this.method = method;
        this.resolve = resolve;
        this.reject = reject;
        this.called = false;
        this.args = args;
    }
    return PreInitMethodCall;
}());
export { PreInitMethodCall };
/**
 *  Represents any and all the buffered method calls that occurred before initialization.
 */
var PreInitMethodCallBuffer = /** @class */ (function () {
    function PreInitMethodCallBuffer() {
        var calls = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            calls[_i] = arguments[_i];
        }
        this._callMap = {};
        this.push.apply(this, calls);
    }
    Object.defineProperty(PreInitMethodCallBuffer.prototype, "calls", {
        /**
         * Pull any buffered method calls from the window object, and use them to hydrate the instance buffer.
         */
        get: function () {
            this._pushSnippetWindowBuffer();
            return this._callMap;
        },
        set: function (calls) {
            this._callMap = calls;
        },
        enumerable: false,
        configurable: true
    });
    PreInitMethodCallBuffer.prototype.getCalls = function (methodName) {
        var _a;
        return ((_a = this.calls[methodName]) !== null && _a !== void 0 ? _a : []);
    };
    PreInitMethodCallBuffer.prototype.push = function () {
        var _this = this;
        var calls = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            calls[_i] = arguments[_i];
        }
        calls.forEach(function (call) {
            var eventsExpectingPageContext = [
                'track',
                // 'screen',
                // 'alias',
                // 'group',
                // 'page',
                'identify',
            ];
            if (eventsExpectingPageContext.includes(call.method) &&
                !hasBufferedPageContextAsLastArg(call.args)) {
                call.args = __spreadArray(__spreadArray([], call.args, true), [getDefaultBufferedPageContext()], false);
            }
            if (_this.calls[call.method]) {
                _this.calls[call.method].push(call);
            }
            else {
                _this.calls[call.method] = [call];
            }
        });
    };
    PreInitMethodCallBuffer.prototype.clear = function () {
        // clear calls in the global snippet buffered array.
        this._pushSnippetWindowBuffer();
        // clear calls in this instance
        this.calls = {};
    };
    PreInitMethodCallBuffer.prototype.toArray = function () {
        var _a;
        return (_a = []).concat.apply(_a, Object.values(this.calls));
    };
    /**
     * Fetch the buffered method calls from the window object,
     * normalize them, and use them to hydrate the buffer.
     * This removes existing buffered calls from the window object.
     */
    PreInitMethodCallBuffer.prototype._pushSnippetWindowBuffer = function () {
        var wa = getGlobalReceiver();
        if (!Array.isArray(wa))
            return undefined;
        var buffered = wa.splice(0, wa.length);
        var calls = buffered.map(function (_a) {
            var methodName = _a[0], args = _a.slice(1);
            return new PreInitMethodCall(methodName, args);
        });
        this.push.apply(this, calls);
    };
    return PreInitMethodCallBuffer;
}());
export { PreInitMethodCallBuffer };
/**
 *  Call method and mark as "called"
 *  This function should never throw an error
 */
export function callReceiverMethod(receiver, call) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (call.called) {
                        return [2 /*return*/, undefined];
                    }
                    call.called = true;
                    result = receiver[call.method].apply(receiver, call.args);
                    if (!isThenable(result)) return [3 /*break*/, 2];
                    // do not defer for non-async methods
                    return [4 /*yield*/, result];
                case 1:
                    // do not defer for non-async methods
                    _a.sent();
                    _a.label = 2;
                case 2:
                    call.resolve(result);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    call.reject(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var ReceiverBuffered = /** @class */ (function () {
    function ReceiverBuffered(loader) {
        var _this = this;
        // trackSubmit = this._createMethod('trackSubmit')
        // trackClick = this._createMethod('trackClick')
        // trackLink = this._createMethod('trackLink')
        this.page = this._createMethod('page');
        this.pageView = this._createMethod('pageview');
        this.identify = this._createMethod('identify');
        this.reset = this._createMethod('reset');
        // group = this._createMethod('group') as ReceiverBrowserCore['group']
        this.track = this._createMethod('track');
        this.ready = this._createMethod('ready');
        // alias = this._createMethod('alias')
        this.debug = this._createChainableMethod('debug');
        this.once = this._createChainableMethod('once');
        this.off = this._createChainableMethod('off');
        this.on = this._createChainableMethod('on');
        this.addSourceMiddleware = this._createMethod('addSourceMiddleware');
        // setAnonymousId = this._createMethod('setAnonymousId')
        // addDestinationMiddleware = this._createMethod('addDestinationMiddleware')
        // screen = this._createMethod('screen')
        this.register = this._createMethod('register');
        this.deregister = this._createMethod('deregister');
        this.user = this._createMethod('user');
        this.VERSION = version;
        this._preInitBuffer = new PreInitMethodCallBuffer();
        this._promise = loader(this._preInitBuffer);
        this._promise
            .then(function (_a) {
            var ajs = _a[0], ctx = _a[1];
            _this.instance = ajs;
            _this.ctx = ctx;
        })
            .catch(function () {
            // intentionally do nothing...
            // this result of this promise will be caught by the 'catch' block on this class.
        });
    }
    ReceiverBuffered.prototype.then = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = this._promise).then.apply(_a, args);
    };
    ReceiverBuffered.prototype.catch = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = this._promise).catch.apply(_a, args);
    };
    ReceiverBuffered.prototype.finally = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = this._promise).finally.apply(_a, args);
    };
    ReceiverBuffered.prototype._createMethod = function (methodName) {
        var _this = this;
        return function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (_this.instance) {
                var result = (_a = _this.instance)[methodName].apply(_a, args);
                return Promise.resolve(result);
            }
            return new Promise(function (resolve, reject) {
                _this._preInitBuffer.push(new PreInitMethodCall(methodName, args, resolve, reject));
            });
        };
    };
    /**
     *  These are for methods that where determining when the method gets "flushed" is not important.
     *  These methods will resolve when receiver is fully initialized, and return type (other than Receiver)will not be available.
     */
    ReceiverBuffered.prototype._createChainableMethod = function (methodName) {
        var _this = this;
        return function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (_this.instance) {
                void (_a = _this.instance)[methodName].apply(_a, args);
                return _this;
            }
            else {
                _this._preInitBuffer.push(new PreInitMethodCall(methodName, args));
            }
            return _this;
        };
    };
    return ReceiverBuffered;
}());
export { ReceiverBuffered };
//# sourceMappingURL=index.js.map