"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
var receiver_core_1 = require("@tronic/receiver-core");
function validate(ctx) {
    var event = ctx.event;
    (0, receiver_core_1.assertEventExists)(event);
    (0, receiver_core_1.assertEventType)(event);
    if (event.type === 'track') {
        (0, receiver_core_1.assertTrackEventName)(event);
    }
    /*
  const props = event.properties ?? event.traits
  if (event.type !== 'alias' && !isPlainObject(props)) {
    throw new ValidationError('.properties', 'is not an object')
  }
     */
    (0, receiver_core_1.assertUserIdentity)(event);
    return ctx;
}
exports.validation = {
    name: 'Event Validation',
    type: 'before',
    version: '1.0.0',
    isLoaded: function () { return true; },
    load: function () { return Promise.resolve(); },
    track: validate,
    identify: validate,
};
//# sourceMappingURL=index.js.map