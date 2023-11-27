import { TronicEvent } from '../events';
/**
 * Augments a Tronic event with information about the current page.
 * Page information like URL changes frequently, so this is meant to be captured as close to the event call as possible.
 * Things like `userAgent` do not change, so they can be added later in the flow.
 * We prefer not to add this information to this function, as it increases the main bundle size.
 */
export declare const addPageContext: (event: TronicEvent, pageCtx?: import("./get-page-context").PageContext) => void;
//# sourceMappingURL=add-page-context.d.ts.map