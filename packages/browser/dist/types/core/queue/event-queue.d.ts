import { PriorityQueue } from '../../lib/priority-queue';
import { Context } from '../context';
import { AnyBrowserPlugin } from '../plugin';
import { CoreEventQueue } from '@tronic/receiver-core';
export declare class EventQueue extends CoreEventQueue<Context, AnyBrowserPlugin> {
    constructor(name: string);
    constructor(priorityQueue: PriorityQueue<Context>);
    flush(): Promise<Context[]>;
}
//# sourceMappingURL=event-queue.d.ts.map