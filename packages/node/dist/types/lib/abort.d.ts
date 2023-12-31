/// <reference types="node" />
/**
 * use non-native event emitter for the benefit of non-node runtimes like CF workers.
 */
import { Emitter } from '@tronic/receiver-core';
/**
 * adapted from: https://www.npmjs.com/package/node-abort-controller
 */
export declare class AbortSignal {
    onabort: globalThis.AbortSignal['onabort'];
    aborted: boolean;
    eventEmitter: Emitter<{
        [x: string]: any[];
    }>;
    toString(): string;
    get [Symbol.toStringTag](): string;
    removeEventListener(...args: Parameters<Emitter['off']>): void;
    addEventListener(...args: Parameters<Emitter['on']>): void;
    dispatchEvent(type: string): void;
}
/**
 * @param timeoutMs - Set a request timeout, after which the request is cancelled.
 */
export declare const abortSignalAfterTimeout: (timeoutMs: number) => never[] | readonly [globalThis.AbortSignal, NodeJS.Timeout];
//# sourceMappingURL=abort.d.ts.map