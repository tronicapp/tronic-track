import type { CoreReceiver } from '../receiver';
import type { CoreContext } from '../context';
interface CorePluginConfig {
    options: any;
    priority: 'critical' | 'non-critical';
}
export type PluginType = 'before' | 'after' | 'destination' | 'enrichment' | 'utility';
export interface CorePlugin<Ctx extends CoreContext = CoreContext, Receiver extends CoreReceiver = any> {
    name: string;
    alternativeNames?: string[];
    version: string;
    type: PluginType;
    isLoaded: () => boolean;
    load: (ctx: Ctx, instance: Receiver, config?: CorePluginConfig) => Promise<unknown>;
    unload?: (ctx: Ctx, instance: Receiver) => Promise<unknown> | unknown;
    ready?: () => Promise<unknown>;
    page?: (ctx: Ctx) => Promise<Ctx> | Ctx;
    identify?: (ctx: Ctx) => Promise<Ctx> | Ctx;
    track?: (ctx: Ctx) => Promise<Ctx> | Ctx;
}
export {};
//# sourceMappingURL=index.d.ts.map