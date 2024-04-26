import { v4 as uuid } from '@lukeed/uuid'
import { dset } from 'dset'
import { ID, User } from '../user'
import {
  Options,
  EventProperties,
  Traits,
  TronicEvent,
} from './interfaces'
import md5 from 'spark-md5'
import { addPageContext, PageContext } from '../page'

export * from './interfaces'

export class EventFactory {
  constructor(public user: User) {}

  page(
    category: string | null,
    page: string | null,
    properties?: EventProperties,
    options?: Options,
    pageCtx?: PageContext
  ): TronicEvent {
    const event: Partial<TronicEvent> = {
      type: 'track' as const,
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

    return this.normalize(
      {
        ...this.baseEvent(),
        ...event,
      } as TronicEvent,
      pageCtx
    )
  }

  track(
    eventName: string,
    // channelId?: string,
    properties?: EventProperties,
    options?: Options,
    pageCtx?: PageContext
  ): TronicEvent {
    const event = this.normalize(
      {
        ...this.baseEvent(),
        type: 'track' as const,
        event: eventName,
        properties: properties ?? {}, // TODO: why is this not a shallow copy like everywhere else?
        options: { ...options },
      },
      pageCtx
    )
    /*
    if (channelId) {
      event.channelId = channelId;
      }
     */
    return event;
  }

  identify(
    userId: ID,
    // channelId?: string,
    traits?: Traits,
    options?: Options,
    pageCtx?: PageContext
  ): TronicEvent {
    const event = this.normalize(
      {
        ...this.baseEvent(),
        type: 'identify' as const,
        userId,
        traits,
        options: { ...options },
      },
      pageCtx
    )
    /*
    if (channelId) {
    event.channelId = channelId;
    }
     */
    return event;
  }

  private baseEvent(): Partial<TronicEvent> {
    const base: Partial<TronicEvent> = {
      options: {},
    }

    const user = this.user

    if (user.id()) {
      base.userId = user.id()
    }

    if (user.anonymousId()) {
      base.anonymousId = user.anonymousId()
    }

    return base
  }

  /**
   * Builds the context part of an event based on "foreign" keys that
   * are provided in the `Options` parameter for an Event
   */
  private context(event: TronicEvent): [object, object] {
    const optionsKeys = ['anonymousId', 'timestamp', 'userId']

    const options: Record<string, any> = event.options ?? {}

    const providedOptionsKeys = Object.keys(options)

    const context = event.options?.context ?? {}
    const overrides: Record<string, any> = {}

    providedOptionsKeys.forEach((key) => {
      if (key === 'context') {
        return
      }

      if (optionsKeys.includes(key)) {
        dset(overrides, key, options[key])
      } else {
        dset(context, key, options[key])
      }
    })

    return [context, overrides]
  }

  public normalize(event: TronicEvent, pageCtx?: PageContext): TronicEvent {

    // set anonymousId globally if we encounter an override

    event.options?.anonymousId &&
      this.user.anonymousId(event.options.anonymousId)

    const [context, overrides] = this.context(event)
    const { options, ...rest } = event

    const newEvent: TronicEvent = {
      timestamp: new Date(),
      ...rest,
      context,
      ...overrides,
      messageId: 'tjs-' + md5.hash(JSON.stringify(event) + uuid()),
    }
    addPageContext(newEvent, pageCtx)

    return newEvent
  }
}
