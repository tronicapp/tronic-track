import { isFunction, isPlainObject, isString, isNumber, } from '@tronic/receiver-core';
/**
 * Helper for the track method
 */
export function resolveArguments(channelId, userId, eventName, properties, options, callback) {
    var _a;
    var args = [channelId, userId, eventName, properties, options, callback];
    if (!channelId || !isString(channelId)) {
        throw new Error('ChannelId missing');
    }
    if (!userId || !isString(userId)) {
        throw new Error('UserId missing');
    }
    var name = isPlainObject(eventName) ? eventName.event : eventName;
    if (!name || !isString(name)) {
        throw new Error('Event missing');
    }
    var data = isPlainObject(eventName)
        ? (_a = eventName.properties) !== null && _a !== void 0 ? _a : {}
        : isPlainObject(properties)
            ? properties
            : {};
    var opts = {};
    if (!isFunction(options)) {
        opts = options !== null && options !== void 0 ? options : {};
    }
    if (isPlainObject(eventName) && !isFunction(properties)) {
        opts = properties !== null && properties !== void 0 ? properties : {};
    }
    var cb = args.find(isFunction);
    return [channelId, userId, name, data, opts, cb];
}
/**
 * Helper for group, identify methods
 */
export var resolveUserArguments = function (user) {
    return function () {
        var _a, _b, _c;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var values = {};
        // It's a stack so it's reversed so that we go through each of the expected arguments
        var orderStack = [
            'callback',
            'options',
            'traits',
            'id',
            // 'channelId',
        ];
        // Read each argument and eval the possible values here
        for (var _d = 0, args_1 = args; _d < args_1.length; _d++) {
            var arg = args_1[_d];
            var current = orderStack.pop();
            if (current === 'id') {
                if (isString(arg) || isNumber(arg)) {
                    values.id = arg.toString();
                    continue;
                }
                if (arg === null || arg === undefined) {
                    continue;
                }
                // First argument should always be the id, if it is not a valid value we can skip it
                current = orderStack.pop();
            }
            // Traits and Options
            if ((current === 'traits' || current === 'options') &&
                (arg === null || arg === undefined || isPlainObject(arg))) {
                values[current] = arg;
            }
            // Callback
            if (isFunction(arg)) {
                values.callback = arg;
                break; // This is always the last argument
            }
        }
        return [
            // values.channelId,
            (_a = values.id) !== null && _a !== void 0 ? _a : user.id(),
            ((_b = values.traits) !== null && _b !== void 0 ? _b : {}),
            (_c = values.options) !== null && _c !== void 0 ? _c : {},
            values.callback,
        ];
    };
};
//# sourceMappingURL=index.js.map