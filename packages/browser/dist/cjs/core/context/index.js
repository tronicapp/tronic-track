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
exports.ContextCancelation = exports.Context = void 0;
var receiver_core_1 = require("@tronic/receiver-core");
Object.defineProperty(exports, "ContextCancelation", { enumerable: true, get: function () { return receiver_core_1.ContextCancelation; } });
var stats_1 = require("../stats");
var Context = /** @class */ (function (_super) {
    __extends(Context, _super);
    function Context(event, id) {
        return _super.call(this, event, id, new stats_1.Stats()) || this;
    }
    Context.system = function () {
        return new this({ type: 'track', event: 'system' });
    };
    return Context;
}(receiver_core_1.CoreContext));
exports.Context = Context;
//# sourceMappingURL=index.js.map