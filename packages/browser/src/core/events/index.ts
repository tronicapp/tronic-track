import { v4 as uuid } from '@lukeed/uuid'
import { dset } from 'dset'
import { ID, User } from '../user'
import {
  // Options,
  // Integrations,
  EventProperties,
  Traits,
  TronicEvent,
} from './interfaces'
import md5 from 'spark-md5'
import { addPageContext, PageContext } from '../page'

export * from './interfaces'

export class EventFactory {
  constructor(public user: User) {}

  track(
    channelId: string,
    userId: string,
    event: string,
    properties?: EventProperties,
    // options?: Options,
    // globalIntegrations?: Integrations,
    pageCtx?: PageContext
  ): TronicEvent {
    return this.normalize(
      {
        ...this.baseEvent(),
        channelId,
        userId,
        event,
        type: 'track' as const,
        properties,
        // options: { ...options },
        // integrations: { ...globalIntegrations },
      },
      pageCtx
    )
  }

  identify(
    channelId: string,
    userId: ID,
    traits?: Traits,
    // options?: Options,
    // globalIntegrations?: Integrations,
    pageCtx?: PageContext
  ): TronicEvent {
    return this.normalize(
      {
        channelId,
        ...this.baseEvent(),
        type: 'identify' as const,
        userId,
        traits,
        // options: { ...options },
        // integrations: { ...globalIntegrations },
      },
      pageCtx
    )
  }

  private baseEvent(): Partial<TronicEvent> {
    const base: Partial<TronicEvent> = {
      // integrations: {},
      // options: {},
    }

      /*
    const user = this.user

    if (user.id()) {
      base.userId = user.id()
    }

    if (user.anonymousId()) {
      base.anonymousId = user.anonymousId()
    }
      */

    return base
  }

  /**
   * Builds the context part of an event based on "foreign" keys that
   * are provided in the `Options` parameter for an Event
   */
  private context(event: TronicEvent): [object, object] {
    const optionsKeys = ['integrations', 'anonymousId', 'timestamp', 'userId']

    const options: Record<string, any> = /* event.options ?? */ {}
    // delete options['integrations']

    const providedOptionsKeys = Object.keys(options)

    const context = /* event.options?.context ?? */ {}
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
    /*
    // set anonymousId globally if we encounter an override
    //segment.com/docs/connections/sources/catalog/libraries/website/javascript/identity/#override-the-anonymous-id-using-the-options-object
    event.options?.anonymousId &&
      this.user.anonymousId(event.options.anonymousId)

    const integrationBooleans = Object.keys(event.integrations ?? {}).reduce(
      (integrationNames, name) => {
        return {
          ...integrationNames,
          [name]: Boolean(event.integrations?.[name]),
        }
      },
      {} as Record<string, boolean>
    )

    // This is pretty trippy, but here's what's going on:
    // - a) We don't pass initial integration options as part of the event, only if they're true or false
    // - b) We do accept per integration overrides (like integrations.Amplitude.sessionId) at the event level
    // Hence the need to convert base integration options to booleans, but maintain per event integration overrides
    const allIntegrations = {
      // Base config integrations object as booleans
      ...integrationBooleans,

      // Per event overrides, for things like amplitude sessionId, for example
      ...event.options?.integrations,
    }
     */

    const [context, overrides] = this.context(event)
    const { /* options, */ ...rest } = event

    const newEvent: TronicEvent = {
      timestamp: new Date(),
      ...rest,
      context,
      // integrations: allIntegrations,
      ...overrides,
      // messageId: 'ajs-next-' + md5.hash(JSON.stringify(event) + uuid()),
    }
    addPageContext(newEvent, pageCtx)

    return newEvent
  }
}
