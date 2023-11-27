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
Object.defineProperty(exports, "__esModule", { value: true });
var fetch_1 = require("../../lib/fetch");
var on_page_change_1 = require("../../lib/on-page-change");
var MAX_PAYLOAD_SIZE = 500;
function kilobytes(buffer) {
    var size = encodeURI(JSON.stringify(buffer)).split(/%..|./).length - 1;
    return size / 1024;
}
/**
 * Checks if the payload is over or close to
 * the maximum payload size allowed by tracking
 * API.
 */
function approachingTrackingAPILimit(buffer) {
    return kilobytes(buffer) >= MAX_PAYLOAD_SIZE - 50;
}
function chunks(batch) {
    var result = [];
    var index = 0;
    batch.forEach(function (item) {
        var size = kilobytes(result[index]);
        if (size >= 64) {
            index++;
        }
        if (result[index]) {
            result[index].push(item);
        }
        else {
            result[index] = [item];
        }
    });
    return result;
}
function batch(apiHost, config) {
    var _a, _b;
    var buffer = [];
    var pageUnloaded = false;
    var limit = (_a = config === null || config === void 0 ? void 0 : config.size) !== null && _a !== void 0 ? _a : 10;
    var timeout = (_b = config === null || config === void 0 ? void 0 : config.timeout) !== null && _b !== void 0 ? _b : 5000;
    function sendBatch(batch) {
        var _a;
        if (batch.length === 0) {
            return;
        }
        var writeKey = (_a = batch[0]) === null || _a === void 0 ? void 0 : _a.writeKey;
        // Remove sentAt from every event as batching only needs a single timestamp
        var updatedBatch = batch.map(function (event) {
            var _a = event, sentAt = _a.sentAt, newEvent = __rest(_a, ["sentAt"]);
            return newEvent;
        });
        return (0, fetch_1.fetch)("https://".concat(apiHost, "/b"), {
            keepalive: pageUnloaded,
            headers: {
                'Content-Type': 'text/plain',
            },
            method: 'post',
            body: JSON.stringify({
                writeKey: writeKey,
                batch: updatedBatch,
                sentAt: new Date().toISOString(),
            }),
        });
    }
    function flush() {
        return __awaiter(this, void 0, void 0, function () {
            var batch_1;
            return __generator(this, function (_a) {
                if (buffer.length) {
                    batch_1 = buffer;
                    buffer = [];
                    return [2 /*return*/, sendBatch(batch_1)];
                }
                return [2 /*return*/];
            });
        });
    }
    var schedule;
    function scheduleFlush() {
        if (schedule) {
            return;
        }
        schedule = setTimeout(function () {
            schedule = undefined;
            flush().catch(console.error);
        }, timeout);
    }
    (0, on_page_change_1.onPageChange)(function (unloaded) {
        pageUnloaded = unloaded;
        if (pageUnloaded && buffer.length) {
            var reqs = chunks(buffer).map(sendBatch);
            Promise.all(reqs).catch(console.error);
        }
    });
    function dispatch(_url, body) {
        return __awaiter(this, void 0, void 0, function () {
            var bufferOverflow;
            return __generator(this, function (_a) {
                buffer.push(body);
                bufferOverflow = buffer.length >= limit || approachingTrackingAPILimit(buffer);
                return [2 /*return*/, bufferOverflow || pageUnloaded ? flush() : scheduleFlush()];
            });
        });
    }
    return {
        dispatch: dispatch,
    };
}
exports.default = batch;
//# sourceMappingURL=batched-dispatcher.js.map