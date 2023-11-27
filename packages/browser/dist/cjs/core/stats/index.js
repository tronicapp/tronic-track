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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stats = void 0;
var receiver_core_1 = require("@tronic/receiver-core");
var remote_metrics_1 = require("./remote-metrics");
var remoteMetrics;
var Stats = /** @class */ (function (_super) {
    __extends(Stats, _super);
    function Stats() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Stats.initRemoteMetrics = function (options) {
        remoteMetrics = new remote_metrics_1.RemoteMetrics(options);
    };
    Stats.prototype.increment = function (metric, by, tags) {
        _super.prototype.increment.call(this, metric, by, tags);
        remoteMetrics === null || remoteMetrics === void 0 ? void 0 : remoteMetrics.increment(metric, tags !== null && tags !== void 0 ? tags : []);
    };
    return Stats;
}(receiver_core_1.CoreStats));
exports.Stats = Stats;
//# sourceMappingURL=index.js.map