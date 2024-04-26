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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventFactory = void 0;
var uuid_1 = require("@lukeed/uuid");
var dset_1 = require("dset");
var spark_md5_1 = __importDefault(require("spark-md5"));
var page_1 = require("../page");
__exportStar(require("./interfaces"), exports);
var EventFactory = /** @class */ (function () {
    function EventFactory(user) {
        this.user = user;
    }
    EventFactory.prototype.page = function (category, page, properties, options, pageCtx) {
        var _a;
        var event = {
            type: 'track',
            event: 'pageview',
            properties: __assign({}, properties),
            options: __assign({}, options),
        };
        if (category !== null) {
            event.category = category;
            event.properties = (_a = event.properties) !== null && _a !== void 0 ? _a : {};
            event.properties.category = category;
        }
        if (page !== null) {
            event.name = page;
        }
        return this.normalize(__assign(__assign({}, this.baseEvent()), event), pageCtx);
    };
    EventFactory.prototype.track = function (eventName, 
    // channelId?: string,
    properties, options, pageCtx) {
        var event = this.normalize(__assign(__assign({}, this.baseEvent()), { type: 'track', event: eventName, properties: properties !== null && properties !== void 0 ? properties : {}, options: __assign({}, options) }), pageCtx);
        /*
        if (channelId) {
          event.channelId = channelId;
          }
         */
        return event;
    };
    EventFactory.prototype.identify = function (userId, 
    // channelId?: string,
    traits, options, pageCtx) {
        var event = this.normalize(__assign(__assign({}, this.baseEvent()), { type: 'identify', userId: userId, traits: traits, options: __assign({}, options) }), pageCtx);
        /*
        if (channelId) {
        event.channelId = channelId;
        }
         */
        return event;
    };
    EventFactory.prototype.baseEvent = function () {
        var base = {
            options: {},
        };
        var user = this.user;
        if (user.id()) {
            base.userId = user.id();
        }
        if (user.anonymousId()) {
            base.anonymousId = user.anonymousId();
        }
        return base;
    };
    /**
     * Builds the context part of an event based on "foreign" keys that
     * are provided in the `Options` parameter for an Event
     */
    EventFactory.prototype.context = function (event) {
        var _a, _b, _c;
        var optionsKeys = ['anonymousId', 'timestamp', 'userId'];
        var options = (_a = event.options) !== null && _a !== void 0 ? _a : {};
        var providedOptionsKeys = Object.keys(options);
        var context = (_c = (_b = event.options) === null || _b === void 0 ? void 0 : _b.context) !== null && _c !== void 0 ? _c : {};
        var overrides = {};
        providedOptionsKeys.forEach(function (key) {
            if (key === 'context') {
                return;
            }
            if (optionsKeys.includes(key)) {
                (0, dset_1.dset)(overrides, key, options[key]);
            }
            else {
                (0, dset_1.dset)(context, key, options[key]);
            }
        });
        return [context, overrides];
    };
    EventFactory.prototype.normalize = function (event, pageCtx) {
        // set anonymousId globally if we encounter an override
        var _a;
        ((_a = event.options) === null || _a === void 0 ? void 0 : _a.anonymousId) &&
            this.user.anonymousId(event.options.anonymousId);
        var _b = this.context(event), context = _b[0], overrides = _b[1];
        var options = event.options, rest = __rest(event, ["options"]);
        var newEvent = __assign(__assign(__assign(__assign({ timestamp: new Date() }, rest), { context: context }), overrides), { messageId: 'tjs-' + spark_md5_1.default.hash(JSON.stringify(event) + (0, uuid_1.v4)()) });
        (0, page_1.addPageContext)(newEvent, pageCtx);
        return newEvent;
    };
    return EventFactory;
}());
exports.EventFactory = EventFactory;
//# sourceMappingURL=index.js.map