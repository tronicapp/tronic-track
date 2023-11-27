import { Plugin } from '../../core/plugin';
import { TronicEvent } from '../../core/events';
interface ReceiverNodeSettings {
    writeKey: string;
    name: string;
    type: Plugin['type'];
    version: string;
}
export declare function post(event: TronicEvent, writeKey: string): Promise<TronicEvent>;
export declare function receiverNode(settings: ReceiverNodeSettings): Plugin;
export {};
//# sourceMappingURL=index.d.ts.map