/**
 * Returns a promise and its associated `resolve` and `reject` methods.
 */
export declare function extractPromiseParts<T = unknown>(): {
    promise: Promise<T>;
    resolve: (value: T) => void;
    reject: (reason?: unknown) => void;
};
//# sourceMappingURL=extract-promise-parts.d.ts.map