import { JSONObject, Options } from '../core/events/interfaces';
import { LegacySettings } from '../browser';
/**
 * Merge legacy settings and initialized Integration option overrides.
 *
 * This will merge any options that were passed from initialization into
 * overrides for settings that are returned by the Tronic CDN.
 *
 * i.e. this allows for passing options directly into destinations from
 * the Receiver constructor.
 */
export declare function mergedOptions(settings: LegacySettings, options: Options): Record<string, JSONObject>;
//# sourceMappingURL=merged-options.d.ts.map