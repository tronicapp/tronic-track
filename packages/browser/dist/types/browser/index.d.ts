import { Receiver, ReceiverSettings, InitOptions } from '../core/receiver';
import { MetricsOptions } from '../core/stats/remote-metrics';
import { RemotePlugin } from '../plugins/remote-loader';
import type { RoutingRule } from '../plugins/routing-middleware';
import { ReceiverBuffered } from '../core/buffer';
export interface LegacyIntegrationConfiguration {
    type?: string;
    versionSettings?: {
        version?: string;
        override?: string;
        componentTypes?: Array<'browser' | 'android' | 'ios' | 'server'>;
    };
    bundlingStatus?: string;
    /**
     * Consent settings for the integration
     */
    consentSettings?: {
        /**
         * Consent categories for the integration
         * @example ["Receiver", "Advertising", "CAT001"]
         */
        categories: string[];
    };
    retryQueue?: boolean;
    [key: string]: any;
}
export interface LegacySettings {
    integrations: {
        [name: string]: LegacyIntegrationConfiguration;
    };
    middlewareSettings?: {
        routingRules: RoutingRule[];
    };
    enabledMiddleware?: Record<string, boolean>;
    metrics?: MetricsOptions;
    remotePlugins?: RemotePlugin[];
    /**
     * Top level consent settings
     */
    consentSettings?: {
        /**
         * All unique consent categories.
         * There can be categories in this array that are important for consent that are not included in any integration  (e.g. 2 cloud mode categories).
         * @example ["Receiver", "Advertising", "CAT001"]
         */
        allCategories: string[];
    };
}
export interface ReceiverBrowserSettings extends ReceiverSettings {
    /**
     * The settings for the Tronic Source.
     * If provided, `ReceiverBrowser` will not fetch remote settings
     * for the source.
     */
    cdnSettings?: LegacySettings & Record<string, unknown>;
    /**
     * If provided, will override the default CDN.
     */
    cdnURL?: string;
}
export declare function loadLegacySettings(writeKey: string, cdnURL?: string): Promise<LegacySettings>;
/**
 * The public browser interface for Tronic Receiver
 *
 * @example
 * ```ts
 *  export const receiver = new ReceiverBrowser()
 *  receiver.load({ writeKey: 'foo' })
 * ```
 * @link https://github.com/tronic/tronic-receiver/#readme
 */
export declare class ReceiverBrowser extends ReceiverBuffered {
    private _resolveLoadStart;
    constructor();
    /**
     * Fully initialize an receiver instance, including:
     *
     * * Fetching settings from the Tronic CDN (by default).
     * * Fetching all remote destinations configured by the user (if applicable).
     * * Flushing buffered receiver events.
     * * Loading all middleware.
     *
     * Note:️  This method should only be called *once* in your application.
     *
     * @example
     * ```ts
     * export const receiver = new ReceiverBrowser()
     * receiver.load({ writeKey: 'foo' })
     * ```
     */
    load(settings: ReceiverBrowserSettings, options?: InitOptions): ReceiverBrowser;
    /**
     * Instantiates an object exposing Receiver methods.
     *
     * @example
     * ```ts
     * const ajs = ReceiverBrowser.load({ writeKey: '<YOUR_WRITE_KEY>' })
     *
     * ajs.track("foo")
     * ...
     * ```
     */
    static load(settings: ReceiverBrowserSettings, options?: InitOptions): ReceiverBrowser;
    static standalone(writeKey: string, options?: InitOptions): Promise<Receiver>;
}
//# sourceMappingURL=index.d.ts.map