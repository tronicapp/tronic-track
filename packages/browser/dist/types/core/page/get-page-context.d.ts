/**
 * Final Page Context object expected in the Event context
 */
export interface PageContext {
    path: string;
    referrer: string;
    search: string;
    title: string;
    url: string;
}
type CanonicalUrl = string | undefined;
export declare const BufferedPageContextDiscriminant: "bpc";
/**
 * Page Context expected to be built by the snippet.
 * Note: The key names are super short because we want to keep the strings in the html snippet short to save bytes.
 */
export interface BufferedPageContext {
    __t: typeof BufferedPageContextDiscriminant;
    c: CanonicalUrl;
    p: PageContext['path'];
    u: PageContext['url'];
    s: PageContext['search'];
    t: PageContext['title'];
    r: PageContext['referrer'];
}
/**
 * `BufferedPageContext` object builder
 */
export declare const createBufferedPageContext: (url: string, canonicalUrl: CanonicalUrl, search: string, path: string, title: string, referrer: string) => BufferedPageContext;
export declare function isBufferedPageContext(bufferedPageCtx: unknown): bufferedPageCtx is BufferedPageContext;
/**
 * Create a `PageContext` from a `BufferedPageContext`.
 * `BufferedPageContext` keys are minified to save bytes in the snippet.
 */
export declare const createPageContext: ({ c: canonicalUrl, p: pathname, s: search, u: url, r: referrer, t: title, }: BufferedPageContext) => PageContext;
/**
 * Get page properties from the browser window/document.
 */
export declare const getDefaultBufferedPageContext: () => BufferedPageContext;
/**
 * Get page properties from the browser window/document.
 */
export declare const getDefaultPageContext: () => PageContext;
export {};
//# sourceMappingURL=get-page-context.d.ts.map