"use strict";
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
exports.scheduleFlush = void 0;
var connection_1 = require("../../core/connection");
var context_1 = require("../../core/context");
var receiver_core_1 = require("@tronic/receiver-core");
var p_while_1 = require("../../lib/p-while");
function flushQueue(xt, queue) {
    return __awaiter(this, void 0, void 0, function () {
        var failedQueue;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    failedQueue = [];
                    if ((0, connection_1.isOffline)()) {
                        return [2 /*return*/, queue];
                    }
                    return [4 /*yield*/, (0, p_while_1.pWhile)(function () { return queue.length > 0 && !(0, connection_1.isOffline)(); }, function () { return __awaiter(_this, void 0, void 0, function () {
                            var ctx, result, success;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        ctx = queue.pop();
                                        if (!ctx) {
                                            return [2 /*return*/];
                                        }
                                        return [4 /*yield*/, (0, receiver_core_1.attempt)(ctx, xt)];
                                    case 1:
                                        result = _a.sent();
                                        success = result instanceof context_1.Context;
                                        if (!success) {
                                            failedQueue.push(ctx);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); })
                        // re-add failed tasks
                    ];
                case 1:
                    _a.sent();
                    // re-add failed tasks
                    failedQueue.map(function (failed) { return queue.pushWithBackoff(failed); });
                    return [2 /*return*/, queue];
            }
        });
    });
}
function scheduleFlush(flushing, buffer, xt, scheduleFlush) {
    var _this = this;
    if (flushing) {
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
        var isFlushing, newBuffer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    isFlushing = true;
                    return [4 /*yield*/, flushQueue(xt, buffer)];
                case 1:
                    newBuffer = _a.sent();
                    isFlushing = false;
                    if (buffer.todo > 0) {
                        scheduleFlush(isFlushing, newBuffer, xt, scheduleFlush);
                    }
                    return [2 /*return*/];
            }
        });
    }); }, Math.random() * 5000);
}
exports.scheduleFlush = scheduleFlush;
//# sourceMappingURL=schedule-flush.js.map