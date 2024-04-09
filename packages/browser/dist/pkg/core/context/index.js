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
import { CoreContext, ContextCancelation, } from '@tronic/receiver-core';
import { Stats } from '../stats';
var Context = /** @class */ (function (_super) {
    __extends(Context, _super);
    function Context(event, id) {
        return _super.call(this, event, id, new Stats()) || this;
    }
    Context.system = function () {
        return new this({ type: 'track', event: 'system' });
    };
    return Context;
}(CoreContext));
export { Context };
export { ContextCancelation };
//# sourceMappingURL=index.js.map