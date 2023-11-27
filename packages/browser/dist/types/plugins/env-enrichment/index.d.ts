import type { Context } from '../../core/context';
import type { Plugin } from '../../core/plugin';
import { Campaign, PluginType } from '@tronic/receiver-core';
import { Receiver } from '../../core/receiver';
export declare function utm(query: string): Campaign;
export declare function ampId(): string | undefined;
declare class EnvironmentEnrichmentPlugin implements Plugin {
    private instance;
    private userAgentData;
    name: string;
    type: PluginType;
    version: string;
    isLoaded: () => boolean;
    load: (_ctx: Context, instance: Receiver) => Promise<void>;
    private enrich;
    track: (ctx: Context) => Context;
    identify: (ctx: Context) => Context;
}
export declare const envEnrichment: EnvironmentEnrichmentPlugin;
export {};
//# sourceMappingURL=index.d.ts.map