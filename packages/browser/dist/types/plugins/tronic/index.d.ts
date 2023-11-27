import { Receiver } from '../../core/receiver';
import { LegacySettings } from '../../browser';
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
    addBundledMetadata?: boolean;
    unbundledIntegrations?: string[];
    bundledConfigIds?: string[];
    unbundledConfigIds?: string[];
    maybeBundledConfigIds?: Record<string, string[]>;
    deliveryStrategy?: DeliveryStrategy;
};
export declare function tronic(receiver: Receiver, settings?: TronicSettings, integrations?: LegacySettings['integrations']): Plugin;
export {};
//# sourceMappingURL=index.d.ts.map