"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPromiseParts = void 0;
/**
 * Returns a promise and its associated `resolve` and `reject` methods.
 */
function extractPromiseParts() {
    let resolver;
    let rejecter;
    const promise = new Promise((resolve, reject) => {
        resolver = resolve;
        rejecter = reject;
    });
    return {
        promise,
        resolve: resolver,
        reject: rejecter,
    };
}
exports.extractPromiseParts = extractPromiseParts;
//# sourceMappingURL=extract-promise-parts.js.map