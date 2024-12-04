import { DispatchedEvent, TrackParams, PageParams, IdentifyParams } from '../arguments-resolver';
import type { FormArgs, LinkArgs } from '../auto-track';
import { Context } from '../context';
import { Emitter } from '@tronic/receiver-core';
import { Plan } from '../events';
import type { Plugin } from '../plugin';
import { EventQueue } from '../queue/event-queue';
import { Group, ID, User, UserOptions } from '../user';
import type { DestinationMiddlewareFunction, MiddlewareFunction } from '../../plugins/middleware';
import { ReceiverCore } from './interfaces';
import { HighEntropyHint } from '../../lib/client-hints/interfaces';
import { CookieOptions, UniversalStorage, StorageSettings } from '../storage';
import { PluginFactory } from '../../plugins/remote-loader';
import { MetricsOptions } from 'core/stats/remote-metrics';
export interface InitOptions {
    writeKey?: string;
    timeout?: number;
    plugins?: (Plugin | PluginFactory)[];
    pluginSettings?: Record<string, any>;
    metrics?: MetricsOptions;
    remotePlugins?: any[];
    consentSettings?: {
        allCategories: string[];
    };
    cdnSettings?: Record<string, unknown>;
    cdnURL?: string;
    disableClientPersistence?: boolean;
    disableAutoISOConversion?: boolean;
    initialPageview?: boolean;
    cookie?: CookieOptions;
    storage?: StorageSettings;
    user?: UserOptions;
    group?: UserOptions;
    plan?: Plan;
    retryQueue?: boolean;
    obfuscate?: boolean;
    useQueryString?: boolean | {
        aid?: RegExp;
        uid?: RegExp;
    };
    highEntropyValuesClientHints?: HighEntropyHint[];
    globalReceiverKey?: string;
}
export declare class Receiver extends Emitter implements ReceiverCore {
    private _user;
    private _group;
    private eventFactory;
    private _debug;
    private _universalStorage;
    initialized: boolean;
    options: InitOptions;
    queue: EventQueue;
    constructor(options: InitOptions, queue?: EventQueue, user?: User, group?: Group);
    user: () => User;
    private createStore;
    get storage(): UniversalStorage;
    page(...args: PageParams): Promise<DispatchedEvent>;
    track(...args: TrackParams): Promise<DispatchedEvent>;
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
    pageview(url: string): Promise<Receiver>;
    get VERSION(): string;
    push(args: any[]): void;
}
//# sourceMappingURL=index.d.ts.map