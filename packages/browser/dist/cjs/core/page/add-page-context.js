"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPageContext = void 0;
var pick_1 = require("../../lib/pick");
var get_page_context_1 = require("./get-page-context");
/**
 * Augments a Tronic event with information about the current page.
 * Page information like URL changes frequently, so this is meant to be captured as close to the event call as possible.
 * Things like `userAgent` do not change, so they can be added later in the flow.
 * We prefer not to add this information to this function, as it increases the main bundle size.
 */
var addPageContext = function (event, pageCtx) {
    if (pageCtx === void 0) { pageCtx = (0, get_page_context_1.getDefaultPageContext)(); }
    var evtCtx = event.context; // Context should be set earlier in the flow
    var pageContextFromEventProps;
    if (event.type === 'track' && event.event === 'pageview') {
        pageContextFromEventProps =
            event.properties && (0, pick_1.pick)(event.properties, Object.keys(pageCtx));
        event.properties = __assign(__assign(__assign({}, pageCtx), event.properties), (event.name ? { name: event.name } : {}));
    }
    evtCtx.page = __assign(__assign(__assign({}, pageCtx), pageContextFromEventProps), evtCtx.page);
};
exports.addPageContext = addPageContext;
//# sourceMappingURL=add-page-context.js.map