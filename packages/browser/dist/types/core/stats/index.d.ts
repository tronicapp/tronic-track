import { CoreStats } from '@tronic/receiver-core';
import { MetricsOptions } from './remote-metrics';
export declare class Stats extends CoreStats {
    static initRemoteMetrics(options?: MetricsOptions): void;
    increment(metric: string, by?: number, tags?: string[]): void;
}
//# sourceMappingURL=index.d.ts.map