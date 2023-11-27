import { assertUserIdentity, assertEventExists, assertEventType, assertTrackEventName, } from '@tronic/receiver-core';
function validate(ctx) {
    var event = ctx.event;
    assertEventExists(event);
    assertEventType(event);
    if (event.type === 'track') {
        assertTrackEventName(event);
    }
    /*
  const props = event.properties ?? event.traits
  if (event.type !== 'alias' && !isPlainObject(props)) {
    throw new ValidationError('.properties', 'is not an object')
  }
     */
    assertUserIdentity(event);
    return ctx;
}
export var validation = {
    name: 'Event Validation',
    type: 'before',
    version: '1.0.0',
    isLoaded: function () { return true; },
    load: function () { return Promise.resolve(); },
    track: validate,
    identify: validate,
};
//# sourceMappingURL=index.js.map