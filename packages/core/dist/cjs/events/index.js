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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventFactory = void 0;
__exportStar(require("./interfaces"), exports);
var dset_1 = require("dset");
var assertions_1 = require("../validation/assertions");
var EventFactory = /** @class */ (function () {
    function EventFactory(settings) {
        this.user = settings.user;
        this.createMessageId = settings.createMessageId;
    }
    EventFactory.prototype.track = function (channelId, userId, event, properties) {
        return this.normalize(__assign(__assign({}, this.baseEvent()), { type: 'track', channelId: channelId, userId: userId, event: event, properties: properties !== null && properties !== void 0 ? properties : {} }));
    };
    EventFactory.prototype.identify = function (channelId, userId, traits) {
        return this.normalize(__assign(__assign({}, this.baseEvent()), { type: 'identify', channelId: channelId, userId: userId, traits: traits !== null && traits !== void 0 ? traits : {} }));
    };
    EventFactory.prototype.baseEvent = function () {
        var base = {
        // integrations: {},
        // options: {},
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
    /**
     * Builds the context part of an event based on "foreign" keys that
     * are provided in the `Options` parameter for an Event
     */
    EventFactory.prototype.context = function (options) {
        var _a;
        /**
         * If the event options are known keys from this list, we move them to the top level of the event.
         * Any other options are moved to context.
         */
        var eventOverrideKeys = [
            'userId',
            'anonymousId',
            'timestamp',
        ];
        delete options['integrations'];
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
        /*
        const integrationBooleans = Object.keys(event.integrations ?? {}).reduce(
          (integrationNames, name) => {
            return {
              ...integrationNames,
              [name]: Boolean(event.integrations?.[name]),
            }
          },
          {} as Record<string, boolean>
        )
    
        // filter out any undefined options
        event.options = pickBy(event.options || {}, (_, value) => {
          return value !== undefined
        })
    
        // This is pretty trippy, but here's what's going on:
        // - a) We don't pass initial integration options as part of the event, only if they're true or false
        // - b) We do accept per integration overrides (like integrations.Amplitude.sessionId) at the event level
        // Hence the need to convert base integration options to booleans, but maintain per event integration overrides
        const allIntegrations = {
          // Base config integrations object as booleans
          ...integrationBooleans,
    
          // Per event overrides, for things like amplitude sessionId, for example
          ...event.options?.integrations,
        }
    
        const [context, overrides] = event.options
          ? this.context(event.options)
          : []
    
        const { options, ...rest } = event
         */
        var body = __assign(__assign({}, event), { timestamp: new Date().toISOString() });
        var evt = __assign({}, body);
        (0, assertions_1.validateEvent)(evt);
        return evt;
    };
    return EventFactory;
}());
exports.EventFactory = EventFactory;
//# sourceMappingURL=index.js.map