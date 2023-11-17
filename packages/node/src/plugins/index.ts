import { Publisher, PublisherProps } from './publisher'
import { version } from '../generated/version'
import { detectRuntime } from '../lib/env'
import { Plugin } from '../app/types'
import { Context } from '../app/context'
import { NodeEmitter } from '../app/emitter'

function normalizeEvent(ctx: Context) {
  ctx.updateEvent('context.library.name', '@tronic/receiver-node')
  ctx.updateEvent('context.library.version', version)
  const runtime = detectRuntime()
  if (runtime === 'node') {
    // eslint-disable-next-line no-restricted-globals
    ctx.updateEvent('_metadata.nodeVersion', process.version)
  }
  ctx.updateEvent('_metadata.jsRuntime', runtime)
}

type DefinedPluginFields =
  | 'name'
  | 'type'
  | 'version'
  | 'isLoaded'
  | 'load'
  | 'identify'
  | 'track'

type TronicNodePlugin = Plugin & Required<Pick<Plugin, DefinedPluginFields>>

export type ConfigureNodePluginProps = PublisherProps

export function createNodePlugin(publisher: Publisher): TronicNodePlugin {
  function action(ctx: Context): Promise<Context> {
    normalizeEvent(ctx)
    return publisher.enqueue(ctx)
  }

  return {
    name: 'Tronic',
    type: 'after',
    version: '1.0.0',
    isLoaded: () => true,
    load: () => Promise.resolve(),
    identify: action,
    track: action,
  }
}

export const createConfiguredNodePlugin = (
  props: ConfigureNodePluginProps,
  emitter: NodeEmitter
) => {
  const publisher = new Publisher(props, emitter)
  return {
    publisher: publisher,
    plugin: createNodePlugin(publisher),
  }
}
