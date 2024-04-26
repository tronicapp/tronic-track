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
import { pick } from '../../lib/pick';
import { getDefaultPageContext } from './get-page-context';
/**
 * Augments a Tronic event with information about the current page.
 * Page information like URL changes frequently, so this is meant to be captured as close to the event call as possible.
 * Things like `userAgent` do not change, so they can be added later in the flow.
 * We prefer not to add this information to this function, as it increases the main bundle size.
 */
export var addPageContext = function (event, pageCtx) {
    if (pageCtx === void 0) { pageCtx = getDefaultPageContext(); }
    var evtCtx = event.context; // Context should be set earlier in the flow
    var pageContextFromEventProps;
    if (event.type === 'track' && event.event === 'pageview') {
        pageContextFromEventProps =
            event.properties && pick(event.properties, Object.keys(pageCtx));
        event.properties = __assign(__assign(__assign({}, pageCtx), event.properties), (event.name ? { name: event.name } : {}));
    }
    evtCtx.page = __assign(__assign(__assign({}, pageCtx), pageContextFromEventProps), evtCtx.page);
};
//# sourceMappingURL=add-page-context.js.map