"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreEventQueue = void 0;
var group_by_1 = require("../utils/group-by");
var priority_queue_1 = require("../priority-queue");
var context_1 = require("../context");
var emitter_1 = require("../emitter");
var task_group_1 = require("../task/task-group");
var delivery_1 = require("./delivery");
var CoreEventQueue = /** @class */ (function (_super) {
    __extends(CoreEventQueue, _super);
    function CoreEventQueue(priorityQueue) {
        var _this = _super.call(this) || this;
        /**
         * All event deliveries get suspended until all the tasks in this task group are complete.
         * For example: a middleware that augments the event object should be loaded safely as a
         * critical task, this way, event queue will wait for it to be ready before sending events.
         *
         * This applies to all the events already in the queue, and the upcoming ones
         */
        _this.criticalTasks = (0, task_group_1.createTaskGroup)();
        _this.plugins = [];
        _this.failedInitializations = [];
        _this.flushing = false;
        _this.queue = priorityQueue;
        _this.queue.on(priority_queue_1.ON_REMOVE_FROM_FUTURE, function () {
            _this.scheduleFlush(0);
        });
        return _this;
    }
    CoreEventQueue.prototype.register = function (ctx, plugin, instance) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve(plugin.load(ctx, instance))
                            .then(function () {
                            _this.plugins.push(plugin);
                        })
                            .catch(function (err) {
                            if (plugin.type === 'destination') {
                                _this.failedInitializations.push(plugin.name);
                                console.warn(plugin.name, err);
                                ctx.log('warn', 'Failed to load destination', {
                                    plugin: plugin.name,
                                    error: err,
                                });
                                return;
                            }
                            throw err;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CoreEventQueue.prototype.deregister = function (ctx, plugin, instance) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!plugin.unload) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.resolve(plugin.unload(ctx, instance))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.plugins = this.plugins.filter(function (p) { return p.name !== plugin.name; });
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        ctx.log('warn', 'Failed to unload destination', {
                            plugin: plugin.name,
                            error: e_1,
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CoreEventQueue.prototype.dispatch = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var willDeliver;
            return __generator(this, function (_a) {
                ctx.log('debug', 'Dispatching');
                ctx.stats.increment('message_dispatched');
                this.queue.push(ctx);
                willDeliver = this.subscribeToDelivery(ctx);
                this.scheduleFlush(0);
                return [2 /*return*/, willDeliver];
            });
        });
    };
    CoreEventQueue.prototype.subscribeToDelivery = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        var onDeliver = function (flushed, delivered) {
                            if (flushed.isSame(ctx)) {
                                _this.off('flush', onDeliver);
                                if (delivered) {
                                    resolve(flushed);
                                }
                                else {
                                    resolve(flushed);
                                }
                            }
                        };
                        _this.on('flush', onDeliver);
                    })];
            });
        });
    };
    CoreEventQueue.prototype.dispatchSingle = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                ctx.log('debug', 'Dispatching');
                ctx.stats.increment('message_dispatched');
                this.queue.updateAttempts(ctx);
                ctx.attempts = 1;
                return [2 /*return*/, this.deliver(ctx).catch(function (err) {
                        var accepted = _this.enqueuRetry(err, ctx);
                        if (!accepted) {
                            ctx.setFailedDelivery({ reason: err });
                            return ctx;
                        }
                        return _this.subscribeToDelivery(ctx);
                    })];
            });
        });
    };
    CoreEventQueue.prototype.isEmpty = function () {
        return this.queue.length === 0;
    };
    CoreEventQueue.prototype.scheduleFlush = function (timeout) {
        var _this = this;
        if (timeout === void 0) { timeout = 500; }
        if (this.flushing) {
            return;
        }
        this.flushing = true;
        setTimeout(function () {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            _this.flush().then(function () {
                setTimeout(function () {
                    _this.flushing = false;
                    if (_this.queue.length) {
                        _this.scheduleFlush(0);
                    }
                }, 0);
            });
        }, timeout);
    };
    CoreEventQueue.prototype.deliver = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var start, done, err_1, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.criticalTasks.done()];
                    case 1:
                        _a.sent();
                        start = Date.now();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.flushOne(ctx)];
                    case 3:
                        ctx = _a.sent();
                        done = Date.now() - start;
                        this.emit('delivery_success', ctx);
                        ctx.stats.gauge('delivered', done);
                        ctx.log('debug', 'Delivered', ctx.event);
                        return [2 /*return*/, ctx];
                    case 4:
                        err_1 = _a.sent();
                        error = err_1;
                        ctx.log('error', 'Failed to deliver', error);
                        this.emit('delivery_failure', ctx, error);
                        ctx.stats.increment('delivery_failed');
                        throw err_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CoreEventQueue.prototype.enqueuRetry = function (err, ctx) {
        var retriable = !(err instanceof context_1.ContextCancelation) || err.retry;
        if (!retriable) {
            return false;
        }
        return this.queue.pushWithBackoff(ctx);
    };
    CoreEventQueue.prototype.flush = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, err_2, accepted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.queue.length === 0) {
                            return [2 /*return*/, []];
                        }
                        ctx = this.queue.pop();
                        if (!ctx) {
                            return [2 /*return*/, []];
                        }
                        ctx.attempts = this.queue.getAttempts(ctx);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.deliver(ctx)];
                    case 2:
                        ctx = _a.sent();
                        this.emit('flush', ctx, true);
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        accepted = this.enqueuRetry(err_2, ctx);
                        if (!accepted) {
                            ctx.setFailedDelivery({ reason: err_2 });
                            this.emit('flush', ctx, false);
                        }
                        return [2 /*return*/, []];
                    case 4: return [2 /*return*/, [ctx]];
                }
            });
        });
    };
    CoreEventQueue.prototype.isReady = function () {
        // return this.plugins.every((p) => p.isLoaded())
        // should we wait for every plugin to load?
        return true;
    };
    CoreEventQueue.prototype.availableExtensions = function (denyList) {
        var available = this.plugins.filter(function (p) {
            var _a, _b, _c;
            // Only filter out destination plugins or the Tronic plugin
            if (p.type !== 'destination' && p.name !== 'Tronic') {
                return true;
            }
            var alternativeNameMatch = undefined;
            (_a = p.alternativeNames) === null || _a === void 0 ? void 0 : _a.forEach(function (name) {
                if (denyList[name] !== undefined) {
                    alternativeNameMatch = denyList[name];
                }
            });
            // Explicit integration option takes precedence, `All: false` does not apply to Tronic
            return ((_c = (_b = denyList[p.name]) !== null && _b !== void 0 ? _b : alternativeNameMatch) !== null && _c !== void 0 ? _c : (p.name === 'Tronic' ? true : denyList.All) !== false);
        });
        var _a = (0, group_by_1.groupBy)(available, 'type'), _b = _a.before, before = _b === void 0 ? [] : _b, _c = _a.enrichment, enrichment = _c === void 0 ? [] : _c, _d = _a.destination, destination = _d === void 0 ? [] : _d, _e = _a.after, after = _e === void 0 ? [] : _e;
        return {
            before: before,
            enrichment: enrichment,
            destinations: destination,
            after: after,
        };
    };
    CoreEventQueue.prototype.flushOne = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, before, enrichment, _i, before_1, beforeWare, temp, _b, enrichment_1, enrichmentWare, temp, _c, destinations, after, afterCalls;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.isReady()) {
                            throw new Error('Not ready');
                        }
                        if (ctx.attempts > 1) {
                            this.emit('delivery_retry', ctx);
                        }
                        _a = this.availableExtensions(
                        /* ctx.event.integrations ?? */ {}), before = _a.before, enrichment = _a.enrichment;
                        _i = 0, before_1 = before;
                        _d.label = 1;
                    case 1:
                        if (!(_i < before_1.length)) return [3 /*break*/, 4];
                        beforeWare = before_1[_i];
                        return [4 /*yield*/, (0, delivery_1.ensure)(ctx, beforeWare)];
                    case 2:
                        temp = _d.sent();
                        if (temp instanceof context_1.CoreContext) {
                            ctx = temp;
                        }
                        this.emit('message_enriched', ctx, beforeWare);
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        _b = 0, enrichment_1 = enrichment;
                        _d.label = 5;
                    case 5:
                        if (!(_b < enrichment_1.length)) return [3 /*break*/, 8];
                        enrichmentWare = enrichment_1[_b];
                        return [4 /*yield*/, (0, delivery_1.attempt)(ctx, enrichmentWare)];
                    case 6:
                        temp = _d.sent();
                        if (temp instanceof context_1.CoreContext) {
                            ctx = temp;
                        }
                        this.emit('message_enriched', ctx, enrichmentWare);
                        _d.label = 7;
                    case 7:
                        _b++;
                        return [3 /*break*/, 5];
                    case 8:
                        _c = this.availableExtensions(
                        /* ctx.event.integrations ?? */ {}), destinations = _c.destinations, after = _c.after;
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                setTimeout(function () {
                                    var attempts = destinations.map(function (destination) {
                                        return (0, delivery_1.attempt)(ctx, destination);
                                    });
                                    Promise.all(attempts).then(resolve).catch(reject);
                                }, 0);
                            })];
                    case 9:
                        _d.sent();
                        ctx.stats.increment('message_delivered');
                        this.emit('message_delivered', ctx);
                        afterCalls = after.map(function (after) { return (0, delivery_1.attempt)(ctx, after); });
                        return [4 /*yield*/, Promise.all(afterCalls)];
                    case 10:
                        _d.sent();
                        return [2 /*return*/, ctx];
                }
            });
        });
    };
    return CoreEventQueue;
}(emitter_1.Emitter));
exports.CoreEventQueue = CoreEventQueue;
//# sourceMappingURL=event-queue.js.map