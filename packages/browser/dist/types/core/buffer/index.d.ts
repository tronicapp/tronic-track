import { Receiver } from '../receiver';
import { Context } from '../context';
import { ReceiverBrowserCore } from '../receiver/interfaces';
import { BufferedPageContext, PageContext } from '../page';
/**
 * The names of any ReceiverBrowser methods that also exist on Receiver
 */
export type PreInitMethodName = 'register' | 'deregister' | 'user' | 'page' | 'pageview' | 'identify' | 'reset' | 'track' | 'ready' | 'debug' | 'once' | 'off' | 'on' | 'addSourceMiddleware';
export declare const flushAddSourceMiddleware: (receiver: Receiver, buffer: PreInitMethodCallBuffer) => Promise<void>;
export declare const flushOn: (receiver: Receiver, buffer: PreInitMethodCallBuffer) => void;
export declare const flushReceiverCallsInNewTask: (receiver: Receiver, buffer: PreInitMethodCallBuffer) => void;
export declare const popPageContext: (args: unknown[]) => PageContext | undefined;
export declare const hasBufferedPageContextAsLastArg: (args: unknown[]) => args is [...unknown[], BufferedPageContext] | [BufferedPageContext];
/**
 *  Represents a buffered method call that occurred before initialization.
 */
export declare class PreInitMethodCall<MethodName extends PreInitMethodName = PreInitMethodName> {
    method: MethodName;
    args: PreInitMethodParams<MethodName>;
    called: boolean;
    resolve: (v: ReturnType<Receiver[MethodName]>) => void;
    reject: (reason: any) => void;
    constructor(method: PreInitMethodCall<MethodName>['method'], args: PreInitMethodParams<MethodName>, resolve?: PreInitMethodCall<MethodName>['resolve'], reject?: PreInitMethodCall<MethodName>['reject']);
}
export type PreInitMethodParams<MethodName extends PreInitMethodName> = [...Parameters<Receiver[MethodName]>, BufferedPageContext] | Parameters<Receiver[MethodName]>;
/**
 *  Represents any and all the buffered method calls that occurred before initialization.
 */
export declare class PreInitMethodCallBuffer {
    private _callMap;
    constructor(...calls: PreInitMethodCall[]);
    /**
     * Pull any buffered method calls from the window object, and use them to hydrate the instance buffer.
     */
    private get calls();
    private set calls(value);
    getCalls<T extends PreInitMethodName>(methodName: T): PreInitMethodCall<T>[];
    push(...calls: PreInitMethodCall[]): void;
    clear(): void;
    toArray(): PreInitMethodCall[];
    /**
     * Fetch the buffered method calls from the window object,
     * normalize them, and use them to hydrate the buffer.
     * This removes existing buffered calls from the window object.
     */
    private _pushSnippetWindowBuffer;
}
/**
 *  Call method and mark as "called"
 *  This function should never throw an error
 */
export declare function callReceiverMethod<T extends PreInitMethodName>(receiver: Receiver, call: PreInitMethodCall<T>): Promise<void>;
export type ReceiverLoader = (preInitBuffer: PreInitMethodCallBuffer) => Promise<[Receiver, Context]>;
export declare class ReceiverBuffered implements PromiseLike<[Receiver, Context]>, ReceiverBrowserCore {
    instance?: Receiver;
    ctx?: Context;
    private _preInitBuffer;
    private _promise;
    constructor(loader: ReceiverLoader);
    then<T1, T2 = never>(...args: [
        onfulfilled: ((instance: [Receiver, Context]) => T1 | PromiseLike<T1>) | null | undefined,
        onrejected?: (reason: unknown) => T2 | PromiseLike<T2>
    ]): Promise<T1 | T2>;
    catch<TResult = never>(...args: [
        onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ]): Promise<[Receiver, Context] | TResult>;
    finally(...args: [onfinally?: (() => void) | undefined | null]): Promise<[Receiver, Context]>;
    page: (category?: string | object | undefined, name?: string | object | import("@tronic/receiver-core").Callback | undefined, properties?: import("../events").Options | import("../events").EventProperties | import("@tronic/receiver-core").Callback | null | undefined, options?: import("../events").Options | import("@tronic/receiver-core").Callback | undefined, callback?: import("@tronic/receiver-core").Callback | undefined) => Promise<Context>;
    pageView: (url: string) => Promise<Receiver>;
    identify: (id?: object | import("../user").ID, traits?: import("@tronic/receiver-core").UserTraits | import("@tronic/receiver-core").Callback | null | undefined, options?: import("../events").Options | import("@tronic/receiver-core").Callback | undefined, callback?: import("@tronic/receiver-core").Callback | undefined) => Promise<Context>;
    reset: () => Promise<void>;
    track: (eventOrEventName: string | import("../events").TronicEvent, properties?: import("../events").EventProperties | import("@tronic/receiver-core").Callback | undefined, options?: import("../events").Options | import("@tronic/receiver-core").Callback | undefined, callback?: import("@tronic/receiver-core").Callback | undefined) => Promise<Context>;
    ready: (callback?: Function | undefined) => Promise<unknown>;
    debug: (toggle: boolean) => ReceiverBuffered;
    once: (event: string, callback: (...args: any[]) => void) => ReceiverBuffered;
    off: (event: string, callback: (...args: any[]) => void) => ReceiverBuffered;
    on: (event: string, callback: (...args: any[]) => void) => ReceiverBuffered;
    addSourceMiddleware: (fn: import("../..").MiddlewareFunction) => Promise<Receiver>;
    register: (...args: import("../plugin").Plugin[]) => Promise<Context>;
    deregister: (...args: string[]) => Promise<Context>;
    user: () => Promise<import("../user").User>;
    readonly VERSION = "0.0.1";
    private _createMethod;
    /**
     *  These are for methods that where determining when the method gets "flushed" is not important.
     *  These methods will resolve when receiver is fully initialized, and return type (other than Receiver)will not be available.
     */
    private _createChainableMethod;
}
//# sourceMappingURL=index.d.ts.map