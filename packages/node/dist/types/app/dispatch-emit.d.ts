import type { NodeEmitter } from './emitter';
import { Context } from './context';
import { NodeEventQueue } from './event-queue';
import { TronicEvent } from './types';
export type Callback = (err?: unknown, ctx?: Context) => void;
export declare const dispatchAndEmit: (event: TronicEvent, queue: NodeEventQueue, emitter: NodeEmitter, callback?: Callback) => Promise<void>;
//# sourceMappingURL=dispatch-emit.d.ts.map