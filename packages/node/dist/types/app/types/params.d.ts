import type { GroupTraits, UserTraits, CoreExtraContext, EventProperties, Timestamp } from '@tronic/receiver-core';
export type { GroupTraits, UserTraits };
/**
 * A dictionary of extra context to attach to the call.
 * Note: context differs from traits because it is not attributes of the user itself.
 */
export interface ExtraContext extends CoreExtraContext {
}
/**
 * An ID associated with the user. Note: at least one of userId or anonymousId must be included.
 **/
type IdentityOptions = {
    userId: string;
    anonymousId?: string;
} | {
    userId?: string;
    anonymousId: string;
};
export type PageParams = {
    category?: string;
    name?: string;
    properties?: EventProperties;
    timestamp?: Timestamp;
    context?: ExtraContext;
    /**
     * Override the default messageId for the purposes of deduping events. Using a uuid library is strongly encouraged.
     * @link https://segment.com/docs/partners/faqs/#does-segment-de-dupe-messages
     */
    messageId?: string;
} & IdentityOptions;
export type IdentifyParams = {
    /**
     * Traits are pieces of information you know about a group.
     * This interface represents standardized reserved traits.
     */
    traits?: UserTraits;
    context?: ExtraContext;
    timestamp?: Timestamp;
} & IdentityOptions;
export type TrackParams = {
    userId: string;
    event: string;
    properties?: EventProperties;
    context?: ExtraContext;
    timestamp?: Timestamp;
} & IdentityOptions;
//# sourceMappingURL=params.d.ts.map