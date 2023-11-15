import { Plugin } from '../../core/plugin'
import { Context } from '../../core/context'
import { TronicEvent } from '../../core/events'
import fetch from 'node-fetch'
import { version } from '../../generated/version'

interface ReceiverNodeSettings {
  writeKey: string
  name: string
  type: Plugin['type']
  version: string
}

const btoa = (val: string): string => Buffer.from(val).toString('base64')

export async function post(
  event: TronicEvent,
  writeKey: string
): Promise<TronicEvent> {
  const res = await fetch(`https://api.tronic.com/v1/${event.type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'tronic-receiver-node/latest',
      Authorization: `Basic ${btoa(writeKey)}`,
    },
    body: JSON.stringify(event),
  })

  if (!res.ok) {
    throw new Error('Message Rejected')
  }

  return event
}

export function receiverNode(settings: ReceiverNodeSettings): Plugin {
  const send = async (ctx: Context): Promise<Context> => {
    ctx.updateEvent('context.library.name', 'tronic-receiver-node')
    ctx.updateEvent('context.library.version', version)
    ctx.updateEvent('_metadata.nodeVersion', process.versions.node)

    await post(ctx.event, settings.writeKey)
    return ctx
  }

  const plugin: Plugin = {
    name: settings.name,
    type: settings.type,
    version: settings.version,

    load: (ctx) => Promise.resolve(ctx),
    isLoaded: () => true,

    track: send,
    identify: send,
  }

  return plugin
}
