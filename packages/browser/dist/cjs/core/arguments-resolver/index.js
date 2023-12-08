"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveUserArguments = exports.resolveArguments = void 0;
var receiver_core_1 = require("@tronic/receiver-core");
/**
 * Helper for the track method
 */
function resolveArguments(channelId, userId, eventName, properties, options, callback) {
    var _a;
    var args = [channelId, userId, eventName, properties, options, callback];
    if (!channelId || !(0, receiver_core_1.isString)(channelId)) {
        throw new Error('ChannelId missing');
    }
    if (!userId || !(0, receiver_core_1.isString)(userId)) {
        throw new Error('UserId missing');
    }
    var name = (0, receiver_core_1.isPlainObject)(eventName) ? eventName.event : eventName;
    if (!name || !(0, receiver_core_1.isString)(name)) {
        throw new Error('Event missing');
    }
    var data = (0, receiver_core_1.isPlainObject)(eventName)
        ? (_a = eventName.properties) !== null && _a !== void 0 ? _a : {}
        : (0, receiver_core_1.isPlainObject)(properties)
            ? properties
            : {};
    var opts = {};
    if (!(0, receiver_core_1.isFunction)(options)) {
        opts = options !== null && options !== void 0 ? options : {};
    }
    if ((0, receiver_core_1.isPlainObject)(eventName) && !(0, receiver_core_1.isFunction)(properties)) {
        opts = properties !== null && properties !== void 0 ? properties : {};
    }
    var cb = args.find(receiver_core_1.isFunction);
    return [channelId, userId, name, data, opts, cb];
}
exports.resolveArguments = resolveArguments;
/**
 * Helper for group, identify methods
 */
var resolveUserArguments = function (user) {
    return function (channelId, id, traits, options, callback) {
        return [
            channelId,
            id,
            traits,
            options,
            callback,
        ];
        /*
            const values: {
              channelId?: string
              id?: ID
              traits?: T | null
              options?: Options
              callback?: Callback
            } = {}
            // It's a stack so it's reversed so that we go through each of the expected arguments
            const orderStack: Array<keyof typeof values> = [
              'callback',
              'options',
              'traits',
              'id',
              'channelId',
            ]
    
            // Read each argument and eval the possible values here
            for (const arg of args) {
              let current = orderStack.pop()
              if (current === 'id') {
                if (isString(arg) || isNumber(arg)) {
                  values.id = arg.toString()
                  continue
                }
                if (arg === null || arg === undefined) {
                  continue
                }
                // First argument should always be the id, if it is not a valid value we can skip it
                current = orderStack.pop()
              }
    
              // Traits and Options
              if (
                (current === 'traits' || current === 'options') &&
                (arg === null || arg === undefined || isPlainObject(arg))
              ) {
                values[current] = arg as T
              }
    
              // Callback
              if (isFunction(arg)) {
                values.callback = arg as Callback
                break // This is always the last argument
              }
            }
    
            return [
              values.channelId,
              values.id ?? user.id(),
              (values.traits ?? {}) as T,
              values.options ?? {},
              values.callback,
            ]
              */
        // return args;
    };
};
exports.resolveUserArguments = resolveUserArguments;
//# sourceMappingURL=index.js.map