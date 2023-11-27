import { TronicEvent } from '../../core/events';
import { Plugin } from '../../core/plugin';
import { SegmentFacade } from '../../lib/to-facade';
export interface MiddlewareParams {
    payload: SegmentFacade;
    next: (payload: MiddlewareParams['payload'] | null) => void;
}
export interface DestinationMiddlewareParams {
    payload: SegmentFacade;
    next: (payload: MiddlewareParams['payload'] | null) => void;
}
export type MiddlewareFunction = (middleware: MiddlewareParams) => void | Promise<void>;
export type DestinationMiddlewareFunction = (middleware: DestinationMiddlewareParams) => void | Promise<void>;
export declare function applyDestinationMiddleware(destination: string, evt: TronicEvent, middleware: DestinationMiddlewareFunction[]): Promise<TronicEvent | null>;
export declare function sourceMiddlewarePlugin(fn: MiddlewareFunction): Plugin;
//# sourceMappingURL=index.d.ts.map