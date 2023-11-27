/**
 * Returns a promise and its associated `resolve` and `reject` methods.
 */
export function extractPromiseParts() {
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
//# sourceMappingURL=extract-promise-parts.js.map