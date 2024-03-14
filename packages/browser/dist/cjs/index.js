"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversalStorage = exports.getGlobalReceiver = void 0;
__exportStar(require("./core/receiver"), exports);
__exportStar(require("./browser"), exports);
__exportStar(require("./core/context"), exports);
__exportStar(require("./core/events"), exports);
__exportStar(require("./core/plugin"), exports);
__exportStar(require("./core/user"), exports);
var global_receiver_helper_1 = require("./lib/global-receiver-helper");
Object.defineProperty(exports, "getGlobalReceiver", { enumerable: true, get: function () { return global_receiver_helper_1.getGlobalReceiver; } });
var storage_1 = require("./core/storage");
Object.defineProperty(exports, "UniversalStorage", { enumerable: true, get: function () { return storage_1.UniversalStorage; } });
//# sourceMappingURL=index.js.map