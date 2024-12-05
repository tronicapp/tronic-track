import type {
  GroupTraits,
  UserTraits,
  CoreExtraContext,
  EventProperties,
  // Integrations,
  Timestamp,
} from '@tronic/receiver-core'

export type { GroupTraits, UserTraits }

/**
 * A dictionary of extra context to attach to the call.
 * Note: context differs from traits because it is not attributes of the user itself.
 */
export interface ExtraContext extends CoreExtraContext {}

/**
 * An ID associated with the user. Note: at least one of userId or anonymousId must be included.
 **/
type IdentityOptions =
  | { userId: string; anonymousId?: string }
  | { userId?: string; anonymousId: string }

export type PageParams = {
  /*  The category of the page. Useful for cases like ecommerce where many pages might live under a single category. */
  category?: string
  /* The name of the page.*/
  name?: string
  /* A dictionary of properties of the page. */
  properties?: EventProperties
  timestamp?: Timestamp
  context?: ExtraContext
  // integrations?: Integrations
  /**
   * Override the default messageId for the purposes of deduping events. Using a uuid library is strongly encouraged.
   */
  messageId?: string
} & IdentityOptions

export type IdentifyParams = {
  /**
   * Traits are pieces of information you know about a group.
   * This interface represents standardized reserved traits.
   */
  // channelId: string;
  traits?: UserTraits
  context?: ExtraContext
  timestamp?: Timestamp
  // integrations?: Integrations
} & IdentityOptions

export type TrackParams = {
  userId: string
  // channelId: string
  event: string
  properties?: EventProperties
  context?: ExtraContext
  timestamp?: Timestamp
  // integrations?: Integrations
} & IdentityOptions
