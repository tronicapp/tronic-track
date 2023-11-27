import { isPlainObject } from '@tronic/receiver-core';
export var BufferedPageContextDiscriminant = 'bpc';
/**
 * `BufferedPageContext` object builder
 */
export var createBufferedPageContext = function (url, canonicalUrl, search, path, title, referrer) { return ({
    __t: BufferedPageContextDiscriminant,
    c: canonicalUrl,
    p: path,
    u: url,
    s: search,
    t: title,
    r: referrer,
}); };
// my clever/dubious way of making sure this type guard does not get out sync with the type definition
var BUFFERED_PAGE_CONTEXT_KEYS = Object.keys(createBufferedPageContext('', '', '', '', '', ''));
export function isBufferedPageContext(bufferedPageCtx) {
    if (!isPlainObject(bufferedPageCtx))
        return false;
    if (bufferedPageCtx.__t !== BufferedPageContextDiscriminant)
        return false;
    // ensure obj has all the keys we expect, and none we don't.
    for (var k in bufferedPageCtx) {
        if (!BUFFERED_PAGE_CONTEXT_KEYS.includes(k)) {
            return false;
        }
    }
    return true;
}
//  Legacy logic: we are we appending search parameters to the canonical URL -- I guess the canonical URL is  "not canonical enough" (lol)
var createCanonicalURL = function (canonicalUrl, searchParams) {
    return canonicalUrl.indexOf('?') > -1
        ? canonicalUrl
        : canonicalUrl + searchParams;
};
/**
 * Strips hash from URL.
 */
var removeHash = function (href) {
    var hashIdx = href.indexOf('#');
    return hashIdx === -1 ? href : href.slice(0, hashIdx);
};
var parseCanonicalPath = function (canonicalUrl) {
    try {
        return new URL(canonicalUrl).pathname;
    }
    catch (_e) {
        // this is classic behavior -- we assume that if the canonical URL is invalid, it's a raw path.
        return canonicalUrl[0] === '/' ? canonicalUrl : '/' + canonicalUrl;
    }
};
/**
 * Create a `PageContext` from a `BufferedPageContext`.
 * `BufferedPageContext` keys are minified to save bytes in the snippet.
 */
export var createPageContext = function (_a) {
    var canonicalUrl = _a.c, pathname = _a.p, search = _a.s, url = _a.u, referrer = _a.r, title = _a.t;
    var newPath = canonicalUrl ? parseCanonicalPath(canonicalUrl) : pathname;
    var newUrl = canonicalUrl
        ? createCanonicalURL(canonicalUrl, search)
        : removeHash(url);
    return {
        path: newPath,
        referrer: referrer,
        search: search,
        title: title,
        url: newUrl,
    };
};
/**
 * Get page properties from the browser window/document.
 */
export var getDefaultBufferedPageContext = function () {
    var c = document.querySelector("link[rel='canonical']");
    return createBufferedPageContext(location.href, (c && c.getAttribute('href')) || undefined, location.search, location.pathname, document.title, document.referrer);
};
/**
 * Get page properties from the browser window/document.
 */
export var getDefaultPageContext = function () {
    return createPageContext(getDefaultBufferedPageContext());
};
//# sourceMappingURL=get-page-context.js.map