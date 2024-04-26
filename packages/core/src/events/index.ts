export * from './interfaces'
import { dset } from 'dset'
import { ID, User } from '../user'
import {
  // Integrations,
  EventProperties,
  CoreEvent,
  CoreOptions,
  CoreExtraContext,
  UserTraits,
  // GroupTraits,
} from './interfaces'
import { pickBy } from '../utils/pick'
import { validateEvent } from '../validation/assertions'
import type { RemoveIndexSignature } from '../utils/ts-helpers'

interface EventFactorySettings {
  createMessageId: () => string
  user?: User
}

// This is currently only used by node.js, but the original idea was to have something that could be shared between browser and node.
// Unfortunately, there are some differences in the way the two environments handle events, so this is not currently shared.

export class EventFactory {
  createMessageId: EventFactorySettings['createMessageId']
  user?: User

  constructor(settings: EventFactorySettings) {
    this.user = settings.user
    this.createMessageId = settings.createMessageId
  }

  page(
    category: string | null,
    page: string | null,
    properties?: EventProperties,
    options?: CoreOptions,
  ) {
    const event: CoreEvent = {
      type: 'track',
      event: 'pageview',
      properties: { ...properties },
      options: { ...options },
    }

    if (category !== null) {
      event.category = category
      event.properties = event.properties ?? {}
      event.properties.category = category
    }

    if (page !== null) {
      event.name = page
    }

    return this.normalize({
      ...this.baseEvent(),
      ...event,
    })
  }

  track(
    // channelId: string,
    event: string,
    properties?: EventProperties,
    options?: CoreOptions,
  ) {
    return this.normalize({
      ...this.baseEvent(),
      type: 'track',
      // channelId,
      event,
      properties: properties ?? {}, // TODO: why is this not a shallow copy like everywhere else?
      options: { ...options },
    })
  }

  identify(
    // channelId: string,
    userId: ID,
    traits?: UserTraits,
    options?: CoreOptions,
  ): CoreEvent {
    return this.normalize({
      ...this.baseEvent(),
      type: 'identify',
      // channelId,
      userId,
      traits: traits ?? {},
      options: { ...options },
    })
  }

  private baseEvent(): Partial<CoreEvent> {
    const base: Partial<CoreEvent> = {
      options: {},
    }

    if (!this.user) return base

    const user = this.user

    if (user.id()) {
      base.userId = user.id()
    }

    if (user.anonymousId()) {
      base.anonymousId = user.anonymousId()
    }

    return base
  }

  // Builds the context part of an event based on "foreign" keys that
  // are provided in the `Options` parameter for an Event

  private context(
    options: CoreOptions
  ): [CoreExtraContext, Partial<CoreEvent>] {
    type CoreOptionKeys = keyof RemoveIndexSignature<CoreOptions>

    // If the event options are known keys from this list, we move them to the top level of the event.
    // Any other options are moved to context.

    const eventOverrideKeys: CoreOptionKeys[] = [
      'userId',
      'anonymousId',
      'timestamp',
    ]

    // delete options['integrations']

    const providedOptionsKeys = Object.keys(options) as Exclude<
      CoreOptionKeys,
      'integrations'
    >[]

    const context = options.context ?? {}
    const eventOverrides = {}

    providedOptionsKeys.forEach((key) => {
      if (key === 'context') {
        return
      }

      if (eventOverrideKeys.includes(key)) {
        dset(eventOverrides, key, options[key])
      } else {
        dset(context, key, options[key])
      }
    })

    return [context, eventOverrides]
  }

  public normalize(event: CoreEvent): CoreEvent {

    // console.log('normalize0', event);

    // filter out any undefined options
    event.options = pickBy(event.options || {}, (_, value) => {
      return value !== undefined
    })

    const [context, overrides] = event.options
      ? this.context(event.options)
      : []

    const { options, ...rest } = event

    // console.log('normalize1', context, overrides, options, rest);

    const body = {
      ...event,
      timestamp: new Date().toISOString(),
      ...rest,
      context,
      ...overrides,
    }

    // console.log('normalize2', body);

    const evt: CoreEvent = {
      ...body,
      // messageId: this.createMessageId(),
    }

    validateEvent(evt)
    return evt
  }
}
