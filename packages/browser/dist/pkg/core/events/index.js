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
import { dset } from 'dset';
import { addPageContext } from '../page';
export * from './interfaces';
var EventFactory = /** @class */ (function () {
    function EventFactory(user) {
        this.user = user;
    }
    EventFactory.prototype.track = function (channelId, userId, event, properties, 
    // options?: Options,
    // globalIntegrations?: Integrations,
    pageCtx) {
        return this.normalize(__assign(__assign({}, this.baseEvent()), { channelId: channelId, userId: userId, event: event, type: 'track', properties: properties }), pageCtx);
    };
    EventFactory.prototype.identify = function (channelId, userId, traits, options, 
    // globalIntegrations?: Integrations,
    pageCtx) {
        return this.normalize(__assign(__assign({ channelId: channelId }, this.baseEvent()), { type: 'identify', userId: userId, traits: traits }), pageCtx);
    };
    EventFactory.prototype.baseEvent = function () {
        var base = {
        // integrations: {},
        // options: {},
        };
        /*
      const user = this.user
  
      if (user.id()) {
        base.userId = user.id()
      }
  
      if (user.anonymousId()) {
        base.anonymousId = user.anonymousId()
      }
        */
        return base;
    };
    /**
     * Builds the context part of an event based on "foreign" keys that
     * are provided in the `Options` parameter for an Event
     */
    EventFactory.prototype.context = function (event) {
        var optionsKeys = ['integrations', 'anonymousId', 'timestamp', 'userId'];
        var options = /* event.options ?? */ {};
        // delete options['integrations']
        var providedOptionsKeys = Object.keys(options);
        var context = /* event.options?.context ?? */ {};
        var overrides = {};
        providedOptionsKeys.forEach(function (key) {
            if (key === 'context') {
                return;
            }
            if (optionsKeys.includes(key)) {
                dset(overrides, key, options[key]);
            }
            else {
                dset(context, key, options[key]);
            }
        });
        return [context, overrides];
    };
    EventFactory.prototype.normalize = function (event, pageCtx) {
        /*
        // set anonymousId globally if we encounter an override
    
        event.options?.anonymousId &&
          this.user.anonymousId(event.options.anonymousId)
    
        const integrationBooleans = Object.keys(event.integrations ?? {}).reduce(
          (integrationNames, name) => {
            return {
              ...integrationNames,
              [name]: Boolean(event.integrations?.[name]),
            }
          },
          {} as Record<string, boolean>
        )
    
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
         */
        var _a = this.context(event), context = _a[0], overrides = _a[1];
        var /* options, */ rest = __rest(event, []);
        var newEvent = __assign(__assign(__assign({ timestamp: new Date() }, rest), { context: context }), overrides);
        addPageContext(newEvent, pageCtx);
        return newEvent;
    };
    return EventFactory;
}());
export { EventFactory };
//# sourceMappingURL=index.js.map