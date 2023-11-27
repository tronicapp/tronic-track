import type { CorePlugin } from '@tronic/receiver-core';
import type { DestinationMiddlewareFunction } from '../../plugins/middleware';
import type { Receiver } from '../receiver';
import type { Context } from '../context';
export interface Plugin extends CorePlugin<Context, Receiver> {
}
export interface DestinationPlugin extends Plugin {
    addMiddleware: (...fns: DestinationMiddlewareFunction[]) => void;
}
export type AnyBrowserPlugin = Plugin | DestinationPlugin;
//# sourceMappingURL=index.d.ts.map