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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventFactory = void 0;
__exportStar(require("./interfaces"), exports);
var dset_1 = require("dset");
var pick_1 = require("../utils/pick");
var assertions_1 = require("../validation/assertions");
// This is currently only used by node.js, but the original idea was to have something that could be shared between browser and node.
// Unfortunately, there are some differences in the way the two environments handle events, so this is not currently shared.
var EventFactory = /** @class */ (function () {
    function EventFactory(settings) {
        this.user = settings.user;
        this.createMessageId = settings.createMessageId;
    }
    EventFactory.prototype.page = function (category, page, properties, options) {
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
        return this.normalize(__assign(__assign({}, this.baseEvent()), event));
    };
    EventFactory.prototype.track = function (
    // channelId: string,
    event, properties, options) {
        return this.normalize(__assign(__assign({}, this.baseEvent()), { type: 'track', 
            // channelId,
            event: event, properties: properties !== null && properties !== void 0 ? properties : {}, options: __assign({}, options) }));
    };
    EventFactory.prototype.identify = function (
    // channelId: string,
    userId, traits, options) {
        return this.normalize(__assign(__assign({}, this.baseEvent()), { type: 'identify', 
            // channelId,
            userId: userId, traits: traits !== null && traits !== void 0 ? traits : {}, options: __assign({}, options) }));
    };
    EventFactory.prototype.baseEvent = function () {
        var base = {
            options: {},
        };
        if (!this.user)
            return base;
        var user = this.user;
        if (user.id()) {
            base.userId = user.id();
        }
        if (user.anonymousId()) {
            base.anonymousId = user.anonymousId();
        }
        return base;
    };
    // Builds the context part of an event based on "foreign" keys that
    // are provided in the `Options` parameter for an Event
    EventFactory.prototype.context = function (options) {
        var _a;
        // If the event options are known keys from this list, we move them to the top level of the event.
        // Any other options are moved to context.
        var eventOverrideKeys = [
            'userId',
            'anonymousId',
            'timestamp',
        ];
        // delete options['integrations']
        var providedOptionsKeys = Object.keys(options);
        var context = (_a = options.context) !== null && _a !== void 0 ? _a : {};
        var eventOverrides = {};
        providedOptionsKeys.forEach(function (key) {
            if (key === 'context') {
                return;
            }
            if (eventOverrideKeys.includes(key)) {
                (0, dset_1.dset)(eventOverrides, key, options[key]);
            }
            else {
                (0, dset_1.dset)(context, key, options[key]);
            }
        });
        return [context, eventOverrides];
    };
    EventFactory.prototype.normalize = function (event) {
        // console.log('normalize0', event);
        // filter out any undefined options
        event.options = (0, pick_1.pickBy)(event.options || {}, function (_, value) {
            return value !== undefined;
        });
        var _a = event.options
            ? this.context(event.options)
            : [], context = _a[0], overrides = _a[1];
        var options = event.options, rest = __rest(event
        // console.log('normalize1', context, overrides, options, rest);
        , ["options"]);
        // console.log('normalize1', context, overrides, options, rest);
        var body = __assign(__assign(__assign(__assign(__assign({}, event), { timestamp: new Date().toISOString() }), rest), { context: context }), overrides);
        // console.log('normalize2', body);
        var evt = __assign({}, body);
        (0, assertions_1.validateEvent)(evt);
        return evt;
    };
    return EventFactory;
}());
exports.EventFactory = EventFactory;
//# sourceMappingURL=index.js.map