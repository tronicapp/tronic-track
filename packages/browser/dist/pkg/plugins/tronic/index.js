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
import { isOffline } from '../../core/connection';
import { PriorityQueue } from '../../lib/priority-queue';
import { PersistedPriorityQueue } from '../../lib/priority-queue/persisted';
import { toFacade } from '../../lib/to-facade';
import batch from './batched-dispatcher';
import standard from './fetch-dispatcher';
import { scheduleFlush } from './schedule-flush';
import { TRONIC_API_HOST } from '../../core/constants';
function onAlias(receiver, json) {
    var _a, _b, _c, _d;
    var user = receiver.user();
    json.previousId =
        (_c = (_b = (_a = json.previousId) !== null && _a !== void 0 ? _a : json.from) !== null && _b !== void 0 ? _b : user.id()) !== null && _c !== void 0 ? _c : user.anonymousId();
    json.userId = (_d = json.userId) !== null && _d !== void 0 ? _d : json.to;
    delete json.from;
    delete json.to;
    return json;
}
export function tronic(receiver, settings, integrations) {
    var _a, _b;
    // Attach `pagehide` before buffer is created so that inflight events are added
    // to the buffer before the buffer persists events in its own `pagehide` handler.
    window.addEventListener('pagehide', function () {
        buffer.push.apply(buffer, Array.from(inflightEvents));
        inflightEvents.clear();
    });
    var writeKey = (_a = settings === null || settings === void 0 ? void 0 : settings.apiKey) !== null && _a !== void 0 ? _a : '';
    var buffer = receiver.options.disableClientPersistence
        ? new PriorityQueue(receiver.queue.queue.maxAttempts, [])
        : new PersistedPriorityQueue(receiver.queue.queue.maxAttempts, "".concat(writeKey, ":dest-tronic"));
    var inflightEvents = new Set();
    var flushing = false;
    var apiHost = (_b = settings === null || settings === void 0 ? void 0 : settings.apiHost) !== null && _b !== void 0 ? _b : TRONIC_API_HOST;
    var protocol = 'http'; // settings?.protocol ?? 'https'
    var remote = "".concat(protocol, "://").concat(apiHost);
    var deliveryStrategy = settings === null || settings === void 0 ? void 0 : settings.deliveryStrategy;
    var client = (deliveryStrategy === null || deliveryStrategy === void 0 ? void 0 : deliveryStrategy.strategy) === 'batching'
        ? batch(apiHost, deliveryStrategy.config)
        : standard(deliveryStrategy === null || deliveryStrategy === void 0 ? void 0 : deliveryStrategy.config);
    function send(ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var path, _json, json;
            return __generator(this, function (_a) {
                if (isOffline()) {
                    buffer.push(ctx);
                    // eslint-disable-next-line @typescript-eslint/no-use-before-define
                    scheduleFlush(flushing, buffer, tronic, scheduleFlush);
                    return [2 /*return*/, ctx];
                }
                inflightEvents.add(ctx);
                path = 'external/' + ctx.event.type;
                _json = toFacade(ctx.event).json();
                if (ctx.event.type === 'track') {
                    delete _json.type;
                    delete _json.traits;
                    delete _json.anonymousId;
                    delete _json.sentAt;
                    delete _json.context;
                }
                json = { "userId": "2XWyaIZf7Tm2uQqa8fYH6GC0oYl", "event": "event0", "properties": { "test": "property" }, "channelId": "2XWyaIasy88a5SJMoLKpkDuDt2O", "timestamp": "2023-10-31T18:28:57.818Z" };
                return [2 /*return*/, client
                        .dispatch("".concat(remote, "/").concat(path), json)
                        .then(function () { return ctx; })
                        .catch(function () {
                        buffer.pushWithBackoff(ctx);
                        // eslint-disable-next-line @typescript-eslint/no-use-before-define
                        scheduleFlush(flushing, buffer, tronic, scheduleFlush);
                        return ctx;
                    })
                        .finally(function () {
                        inflightEvents.delete(ctx);
                    })];
            });
        });
    }
    var tronic = {
        name: 'Tronic',
        type: 'after',
        version: '0.1.0',
        isLoaded: function () { return true; },
        load: function () { return Promise.resolve(); },
        track: send,
        identify: send,
    };
    // Buffer may already have items if they were previously stored in localStorage.
    // Start flushing them immediately.
    if (buffer.todo) {
        scheduleFlush(flushing, buffer, tronic, scheduleFlush);
    }
    return tronic;
}
//# sourceMappingURL=index.js.map