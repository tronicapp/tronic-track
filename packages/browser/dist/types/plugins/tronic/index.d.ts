import { Receiver } from '../../core/receiver';
import { Plugin } from '../../core/plugin';
import { BatchingDispatchConfig } from './batched-dispatcher';
import { StandardDispatcherConfig } from './fetch-dispatcher';
type DeliveryStrategy = {
    strategy?: 'standard';
    config?: StandardDispatcherConfig;
} | {
    strategy?: 'batching';
    config?: BatchingDispatchConfig;
};
export type TronicSettings = {
    apiKey: string;
    apiHost?: string;
    protocol?: 'http' | 'https';
    deliveryStrategy?: DeliveryStrategy;
};
export declare function tronic(receiver: Receiver, settings?: TronicSettings): Plugin;
export {};
//# sourceMappingURL=index.d.ts.map