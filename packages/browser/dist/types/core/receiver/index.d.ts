import { DispatchedEvent, EventParams, IdentifyParams } from '../arguments-resolver';
import type { FormArgs, LinkArgs } from '../auto-track';
import { Context } from '../context';
import { Emitter } from '@tronic/receiver-core';
import { Integrations, Plan } from '../events';
import type { Plugin } from '../plugin';
import { EventQueue } from '../queue/event-queue';
import { Group, ID, User, UserOptions } from '../user';
import type { DestinationMiddlewareFunction, MiddlewareFunction } from '../../plugins/middleware';
import { ReceiverCore } from './interfaces';
import { HighEntropyHint } from '../../lib/client-hints/interfaces';
import type { LegacySettings } from '../../browser';
import { CookieOptions, UniversalStorage, StorageSettings } from '../storage';
import { PluginFactory } from '../../plugins/remote-loader';
export interface ReceiverSettings {
    writeKey: string;
    timeout?: number;
    plugins?: (Plugin | PluginFactory)[];
}
export interface InitOptions {
    /**
     * Disables storing any data on the client-side via cookies or localstorage.
     * Defaults to `false`.
     *
     */
    disableClientPersistence?: boolean;
    /**
     * Disables automatically converting ISO string event properties into Dates.
     * ISO string to Date conversions occur right before sending events to a classic device mode integration,
     * after any destination middleware have been ran.
     * Defaults to `false`.
     */
    disableAutoISOConversion?: boolean;
    initialPageview?: boolean;
    cookie?: CookieOptions;
    storage?: StorageSettings;
    user?: UserOptions;
    group?: UserOptions;
    integrations?: Integrations;
    plan?: Plan;
    retryQueue?: boolean;
    obfuscate?: boolean;
    /**
     * This callback allows you to update/mutate CDN Settings.
     * This is called directly after settings are fetched from the CDN.
     */
    updateCDNSettings?: (settings: LegacySettings) => LegacySettings;
    /**
     * Disables or sets constraints on processing of query string parameters
     */
    useQueryString?: boolean | {
        aid?: RegExp;
        uid?: RegExp;
    };
    /**
     * Array of high entropy Client Hints to request. These may be rejected by the user agent - only required hints should be requested.
     */
    highEntropyValuesClientHints?: HighEntropyHint[];
    /**
     * When using the snippet, this is the key that points to the global receiver instance (e.g. window.receiver).
     * default: receiver
     */
    globalReceiverKey?: string;
}
export declare class Receiver extends Emitter implements ReceiverCore {
    protected settings: ReceiverSettings;
    private _user;
    private _group;
    private eventFactory;
    private _debug;
    private _universalStorage;
    initialized: boolean;
    integrations: Integrations;
    options: InitOptions;
    queue: EventQueue;
    constructor(settings: ReceiverSettings, options?: InitOptions, queue?: EventQueue, user?: User, group?: Group);
    user: () => User;
    /**
     * Creates the storage system based on the settings received
     * @returns Storage
     */
    private createStore;
    get storage(): UniversalStorage;
    track(...args: EventParams): Promise<DispatchedEvent>;
    identify(...args: IdentifyParams): Promise<DispatchedEvent>;
    trackClick(...args: LinkArgs): Promise<Receiver>;
    trackLink(...args: LinkArgs): Promise<Receiver>;
    trackSubmit(...args: FormArgs): Promise<Receiver>;
    trackForm(...args: FormArgs): Promise<Receiver>;
    register(...plugins: Plugin[]): Promise<Context>;
    deregister(...plugins: string[]): Promise<Context>;
    debug(toggle: boolean): Receiver;
    reset(): void;
    timeout(timeout: number): void;
    private _dispatch;
    addSourceMiddleware(fn: MiddlewareFunction): Promise<Receiver>;
    addDestinationMiddleware(integrationName: string, ...middlewares: DestinationMiddlewareFunction[]): Promise<Receiver>;
    setAnonymousId(id?: string): ID;
    queryString(query: string): Promise<Context[]>;
    ready(callback?: Function): Promise<unknown>;
    get VERSION(): string;
    push(args: any[]): void;
}
//# sourceMappingURL=index.d.ts.map