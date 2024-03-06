import { JSONObject, JSONValue } from '../../core/events';
import { DestinationPlugin, Plugin } from '../../core/plugin';
import { DestinationMiddlewareFunction } from '../middleware';
import { Context } from '../../core/context';
import { InitOptions, Receiver } from '../../core/receiver';
export interface RemotePluginConfig {
    name: string;
    creationName: string;
    url: string;
    libraryName: string;
    settings: JSONObject;
}
export declare class RemoteDestinationPlugin implements DestinationPlugin {
    name: string;
    version: string;
    type: Plugin['type'];
    alternativeNames: string[];
    middleware: DestinationMiddlewareFunction[];
    action: Plugin;
    constructor(name: string, action: Plugin);
    addMiddleware(...fn: DestinationMiddlewareFunction[]): void;
    private transform;
    private _createMethod;
    identify: (ctx: Context) => Promise<Context>;
    track: (ctx: Context) => Promise<Context>;
    isLoaded(): boolean;
    ready(): Promise<unknown>;
    load(ctx: Context, receiver: Receiver): Promise<unknown>;
    unload(ctx: Context, receiver: Receiver): Promise<unknown> | unknown;
}
export type PluginFactory = {
    (settings: JSONValue): Plugin | Plugin[] | Promise<Plugin | Plugin[]>;
    pluginName: string;
};
export declare function remoteLoader(options: InitOptions, pluginSources?: PluginFactory[]): Promise<Plugin[]>;
//# sourceMappingURL=index.d.ts.map