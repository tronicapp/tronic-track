import { Facade } from '@segment/facade'
import { Receiver } from '../../core/receiver'
import { isOffline } from '../../core/connection'
import { Context } from '../../core/context'
import { Plugin } from '../../core/plugin'
import { PriorityQueue } from '../../lib/priority-queue'
import { PersistedPriorityQueue } from '../../lib/priority-queue/persisted'
import { toFacade } from '../../lib/to-facade'
import batch, { BatchingDispatchConfig } from './batched-dispatcher'
import standard, { StandardDispatcherConfig } from './fetch-dispatcher'
import { normalize } from './normalize'
import { scheduleFlush } from './schedule-flush'
import { TRONIC_API_HOST } from '../../core/constants'

type DeliveryStrategy =
  | {
      strategy?: 'standard'
      config?: StandardDispatcherConfig
    }
  | {
      strategy?: 'batching'
      config?: BatchingDispatchConfig
    }

export type TronicSettings = {
  apiKey: string
  apiHost?: string
  protocol?: 'http' | 'https'

  deliveryStrategy?: DeliveryStrategy
}

/*
type JSON = ReturnType<Facade['json']>
function onAlias(receiver: Receiver, json: JSON): JSON {
  const user = receiver.user()
  json.previousId =
    json.previousId ?? json.from ?? user.id() ?? user.anonymousId()
  json.userId = json.userId ?? json.to
  delete json.from
  delete json.to
  return json
}
  */

export function tronic(
  receiver: Receiver,
  settings?: TronicSettings,
): Plugin {
  // Attach `pagehide` before buffer is created so that inflight events are added
  // to the buffer before the buffer persists events in its own `pagehide` handler.
  window.addEventListener('pagehide', () => {
    buffer.push(...Array.from(inflightEvents))
    inflightEvents.clear()
  })

  const writeKey = settings?.apiKey ?? receiver.options.writeKey ?? ''

  const buffer = receiver.options.disableClientPersistence
    ? new PriorityQueue<Context>(receiver.queue.queue.maxAttempts, [])
    : new PersistedPriorityQueue(
        receiver.queue.queue.maxAttempts,
        `${writeKey}:dest-tronic`
      )

  const inflightEvents = new Set<Context>()
  const flushing = false

  const apiHost = settings?.apiHost ?? TRONIC_API_HOST
  const protocol = settings?.protocol ?? 'https'
  const remote = `${protocol}://${apiHost}`

  const deliveryStrategy = settings?.deliveryStrategy
  const client =
    deliveryStrategy?.strategy === 'batching'
      ? batch(apiHost, deliveryStrategy.config)
      : standard(writeKey, deliveryStrategy?.config as StandardDispatcherConfig)

  async function send(ctx: Context): Promise<Context> {
    if (isOffline()) {
      buffer.push(ctx)
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      scheduleFlush(flushing, buffer, tronic, scheduleFlush)
      return ctx
    }

    inflightEvents.add(ctx)

    const path = ctx.event.type; // ctx.event.type.charAt(0)

    let json = toFacade(ctx.event).json()

    delete json.type
    delete json.messageId

    if (ctx.event.type === 'track') {
      delete json.traits
      delete json.sentAt
    }

    /*
    if (ctx.event.type === 'alias') {
      json = onAlias(receiver, json)
    }
     */

    return client
      .dispatch(
        `${remote}/${path}`,
        normalize(receiver, json, settings)
      )
      .then(() => ctx)
      .catch(() => {
        buffer.pushWithBackoff(ctx)
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        scheduleFlush(flushing, buffer, tronic, scheduleFlush)
        return ctx
      })
      .finally(() => {
        inflightEvents.delete(ctx)
      })
  }

  const tronic: Plugin = {
    name: 'Tronic',
    type: 'after',
    version: '0.1.0',
    isLoaded: (): boolean => true,
    load: (): Promise<void> => Promise.resolve(),
    track: send,
    identify: send,
  }

  // Buffer may already have items if they were previously stored in localStorage.
  // Start flushing them immediately.
  if (buffer.todo) {
    scheduleFlush(flushing, buffer, tronic, scheduleFlush)
  }

  return tronic
}
