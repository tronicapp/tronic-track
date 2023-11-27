import type { Receiver, ReceiverSettings, InitOptions } from '.';
import type { Plugin } from '../plugin';
import type { EventParams, DispatchedEvent, IdentifyParams } from '../arguments-resolver';
import type { Context } from '../context';
import type { TronicEvent } from '../events';
import type { User } from '../user';
import type { LegacyIntegration } from '../../plugins/ajs-destination/types';
import { CoreReceiver } from '@tronic/receiver-core';
/**
 * All of these methods are a no-op.
 */
/** @deprecated */
interface ReceiverClassicStubs {
    /** @deprecated */
    log(this: never): void;
    /** @deprecated */
    addIntegrationMiddleware(this: never): void;
    /** @deprecated */
    listeners(this: never): void;
    /** @deprecated */
    addEventListener(this: never): void;
    /** @deprecated */
    removeAllListeners(this: never): void;
    /** @deprecated */
    removeListener(this: never): void;
    /** @deprecated */
    removeEventListener(this: never): void;
    /** @deprecated */
    hasListeners(this: never): void;
    /** @deprecated */
    addIntegration(this: never): void;
    /** @deprecated */
    add(this: never): void;
}
/** @deprecated */
export interface ReceiverClassic extends ReceiverClassicStubs {
    /** @deprecated */
    initialize(settings?: ReceiverSettings, options?: InitOptions): Promise<Receiver>;
    /** @deprecated */
    noConflict(): Receiver;
    /** @deprecated */
    normalize(msg: TronicEvent): TronicEvent;
    /** @deprecated */
    readonly failedInitializations: string[];
    /** @deprecated */
    /**  @deprecated*/
    readonly plugins: any;
    /** @deprecated */
    readonly Integrations: Record<string, LegacyIntegration>;
}
/**
 * Interface implemented by concrete Receiver class (commonly accessible if you use "await" on ReceiverBrowser.load())
 */
export interface ReceiverCore extends CoreReceiver {
    track(...args: EventParams): Promise<DispatchedEvent>;
    identify(...args: IdentifyParams): Promise<DispatchedEvent>;
    register(...plugins: Plugin[]): Promise<Context>;
    deregister(...plugins: string[]): Promise<Context>;
    user(): User;
    readonly VERSION: string;
}
/**
 * Interface implemented by ReceiverBrowser (buffered version of receiver) (commonly accessible through ReceiverBrowser.load())
 */
export type ReceiverBrowserCore = Omit<ReceiverCore, 'group' | 'user'> & {
    user(): Promise<User>;
};
export {};
//# sourceMappingURL=interfaces.d.ts.map