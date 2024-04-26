"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePageArguments = exports.resolveUserArguments = exports.resolveArguments = void 0;
var receiver_core_1 = require("@tronic/receiver-core");
/**
 * Helper for the track method
 */
function resolveArguments(eventOrEventName, 
// channelId?: string,
properties, options, callback) {
    var _a;
    var args = [eventOrEventName, /* channelId, */ properties, options, callback];
    var name = (0, receiver_core_1.isPlainObject)(eventOrEventName) ? eventOrEventName.event : eventOrEventName;
    if (!name || !(0, receiver_core_1.isString)(name)) {
        throw new Error('Event missing');
    }
    var data = (0, receiver_core_1.isPlainObject)(eventOrEventName)
        ? (_a = eventOrEventName.properties) !== null && _a !== void 0 ? _a : {}
        : (0, receiver_core_1.isPlainObject)(properties)
            ? properties
            : {};
    var opts = {};
    if (!(0, receiver_core_1.isFunction)(options)) {
        opts = options !== null && options !== void 0 ? options : {};
    }
    if ((0, receiver_core_1.isPlainObject)(eventOrEventName) && !(0, receiver_core_1.isFunction)(properties)) {
        opts = properties !== null && properties !== void 0 ? properties : {};
    }
    var cb = args.find(receiver_core_1.isFunction);
    return [name, /* channelId, */ data, opts, cb];
}
exports.resolveArguments = resolveArguments;
// Helper for group, identify methods
var resolveUserArguments = function (user) {
    return function () {
        /*
        const values: {
          id?: ID
          traits?: T | null
          options?: Options
          callback?: Callback
          } = {}
         */
        var _a, _b, _c;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var x = args[1];
        return [
            // args[0],
            ((_a = args[0]) !== null && _a !== void 0 ? _a : user.id()),
            ((_b = args[1]) !== null && _b !== void 0 ? _b : {}),
            (_c = args[2]) !== null && _c !== void 0 ? _c : {},
            args[3],
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
function resolvePageArguments(category, name, properties, options, callback) {
    var _a, _b;
    var resolvedCategory = null;
    var resolvedName = null;
    var args = [category, name, properties, options, callback];
    var strings = args.filter(receiver_core_1.isString);
    if (strings[0] !== undefined && strings[1] !== undefined) {
        resolvedCategory = strings[0];
        resolvedName = strings[1];
    }
    if (strings.length === 1) {
        resolvedCategory = null;
        resolvedName = strings[0];
    }
    var resolvedCallback = args.find(receiver_core_1.isFunction);
    var objects = args.filter(function (obj) {
        if (resolvedName === null) {
            return (0, receiver_core_1.isPlainObject)(obj);
        }
        return (0, receiver_core_1.isPlainObject)(obj) || obj === null;
    });
    var resolvedProperties = ((_a = objects[0]) !== null && _a !== void 0 ? _a : {});
    var resolvedOptions = ((_b = objects[1]) !== null && _b !== void 0 ? _b : {});
    return [
        resolvedCategory,
        resolvedName,
        resolvedProperties,
        resolvedOptions,
        resolvedCallback,
    ];
}
exports.resolvePageArguments = resolvePageArguments;
//# sourceMappingURL=index.js.map