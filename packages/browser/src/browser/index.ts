import { getCDN, setGlobalCDNUrl } from '../lib/parse-cdn'

// import { fetch } from '../lib/fetch'
import { Receiver, /* ReceiverSettings, */ InitOptions } from '../core/receiver'
import { Context } from '../core/context'
import { Plugin } from '../core/plugin'
// import { MetricsOptions } from '../core/stats/remote-metrics'
// import { mergedOptions } from '../lib/merged-options'
import { createDeferred } from '../lib/create-deferred'
import { envEnrichment } from '../plugins/env-enrichment'
import {
  PluginFactory,
  remoteLoader,
  // RemotePlugin,
} from '../plugins/remote-loader'
import { tronic, TronicSettings } from '../plugins/tronic'
import { validation } from '../plugins/validation'
import {
  ReceiverBuffered,
  PreInitMethodCallBuffer,
  flushReceiverCallsInNewTask,
  flushAddSourceMiddleware,
  // flushSetAnonymousID,
  flushOn,
} from '../core/buffer'
import { attachInspector } from '../core/inspector'
import { Stats } from '../core/stats'
import { setGlobalReceiverKey } from '../lib/global-receiver-helper'

/*
export interface LegacyIntegrationConfiguration {
// @deprecated - This does not indicate browser types anymore
  type?: string

  versionSettings?: {
    version?: string
    override?: string
    componentTypes?: Array<'browser' | 'android' | 'ios' | 'server'>
  }

  bundlingStatus?: string

 // Consent settings for the integration
  consentSettings?: {
  // Consent categories for the integration
  // @example ["Receiver", "Advertising", "CAT001"]
    categories: string[]
  }

  // Tronic.com specific
  // retryQueue?: boolean

  // any extra unknown settings
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
*/

/*
export interface ExternalSettings {

  metrics?: MetricsOptions

  remotePlugins?: RemotePlugin[]

  // Top level consent settings
  consentSettings?: {

     // All unique consent categories.
     // There can be categories in this array that are important for consent that are not included in any integration  (e.g. 2 cloud mode categories).
     // @example ["Receiver", "Advertising", "CAT001"]

    allCategories: string[]
  }
}

export interface ReceiverBrowserSettings extends ReceiverSettings {

  // The settings for the Tronic Source.
  // If provided, `ReceiverBrowser` will not fetch remote settings
  // for the source.

  cdnSettings?: ExternalSettings & Record<string, unknown>
    // If provided, will override the default CDN.

  cdnURL?: string
}
  */

/*
export function fetchSettings(
  writeKey: string,
  cdnURL?: string
): Promise<ExternalSettings> {
  const baseUrl = cdnURL ?? getCDN()

  return fetch(`${baseUrl}/v1/projects/${writeKey}/settings`)
    .then((res) => {
      if (!res.ok) {
        return res.text().then((errorResponseMessage) => {
          throw new Error(errorResponseMessage)
        })
      }
      return res.json()
    })
    .catch((err) => {
      console.error(err.message)
      throw err
    })
}
 */

// With AJS classic, we allow users to call setAnonymousId before the library initialization.
// This is important because some of the destinations will use the anonymousId during the initialization,
// and if we set anonId afterwards, that wouldn’t impact the destination.
//
// Also Ensures events can be registered before library initialization.
// This is important so users can register to 'initialize' and any events that may fire early during setup.
function flushPreBuffer(
  receiver: Receiver,
  buffer: PreInitMethodCallBuffer
): void {
  // flushSetAnonymousID(receiver, buffer)
  flushOn(receiver, buffer)
}

// Finish flushing buffer and cleanup.
async function flushFinalBuffer(
  receiver: Receiver,
  buffer: PreInitMethodCallBuffer
): Promise<void> {
  // Call popSnippetWindowBuffer before each flush task since there may be
  // receiver calls during async function calls.
  await flushAddSourceMiddleware(receiver, buffer)
  flushReceiverCallsInNewTask(receiver, buffer)
  // Clear buffer, just in case receiver is loaded twice; we don't want to fire events off again.
  buffer.clear()
}

async function registerPlugins(
  receiver: Receiver,
  // writeKey: string,
  // externalSettings: ExternalSettings,
  options: InitOptions,
  pluginLikes: (Plugin | PluginFactory)[] = [],
): Promise<Context> {

  const plugins = pluginLikes?.filter(
    (pluginLike) => typeof pluginLike === 'object'
  ) as Plugin[]

  const pluginSources = pluginLikes?.filter(
    (pluginLike) =>
      typeof pluginLike === 'function' &&
      typeof pluginLike.pluginName === 'string'
  ) as PluginFactory[]

  // const mergedSettings = mergedOptions(externalSettings, options)

  const remotePlugins = await remoteLoader(
    options, // externalSettings,
    // { All: true }, // receiver.integrations,
    // mergedSettings,
    // options.obfuscate,
    pluginSources
  ).catch(() => [])

  const toRegister = [
    validation,
    envEnrichment,
    ...plugins,
    ...remotePlugins,
    await tronic(
      receiver,
      // mergedSettings['Tronic'] as TronicSettings,
      options.pluginSettings?.['Tronic'] as TronicSettings,
    ),
  ]

  const ctx = await receiver.register(...toRegister)

  /*
if (
  Object.entries(externalSettings.enabledMiddleware ?? {}).some(
    ([, enabled]) => enabled
  )
) {
  await import(
  //// webpackChunkName: "remoteMiddleware" //// '../plugins/remote-middleware'
  ).then(async ({ remoteMiddlewares }) => {
    const middleware = await remoteMiddlewares(
      ctx,
      externalSettings,
      options.obfuscate
    )
    const promises = middleware.map((mdw) =>
      receiver.addSourceMiddleware(mdw)
    )
    return Promise.all(promises)
  })
}
*/

  return ctx
}

async function loadReceiver(
  // settings: ReceiverBrowserSettings,
  options: InitOptions,
  preInitBuffer: PreInitMethodCallBuffer
): Promise<[Receiver, Context]> {

  if (options.globalReceiverKey) {
    setGlobalReceiverKey(options.globalReceiverKey)
  }

  // this is an ugly side-effect, but it's for the benefits of the plugins that get their cdn via getCDN()
  if (options.cdnURL) {
    setGlobalCDNUrl(options.cdnURL)
  }

  /*
let externalOptions = options.cdnOptions ?? (await fetchOptions(options.writeKey, options.cdnURL))

if (options.updateCDNOptions) {
  externalOptions = options.updateCDNOptions(externalOptions)
}
   */

  // const retryQueue: boolean =
  // externalOptions?.integrations?.['Tronic']?.retryQueue ?? true

  // const opts: InitOptions = { retryQueue, ...options }
  const receiver = new Receiver(options)

  attachInspector(receiver)

  const plugins = options.plugins ?? []

  Stats.initRemoteMetrics(options.metrics)

  // needs to be flushed before plugins are registered
  flushPreBuffer(receiver, preInitBuffer)

  const ctx = await registerPlugins(
    receiver,
    options,
    plugins,
  )

  const search = window.location.search ?? ''
  const hash = window.location.hash ?? ''

  const term = search.length ? search : hash.replace(/(?=#).*(?=\?)/, '')

  if (term.includes('rjs_')) {
    await receiver.queryString(term).catch(console.error)
  }

  receiver.initialized = true
  receiver.emit('initialize', options)

  if (options.initialPageview) {
    receiver.page().catch(console.error)
  }

  await flushFinalBuffer(receiver, preInitBuffer)

  return [receiver, ctx]
}

export class ReceiverBrowser extends ReceiverBuffered {
  private _resolveLoadStart: (
    // settings: ReceiverBrowserSettings,
    options: InitOptions
  ) => void

  constructor() {
    const { promise: loadStart, resolve: resolveLoadStart } =
      createDeferred<Parameters<ReceiverBrowser['load']>>()

    super((buffer) =>
      loadStart.then(([options]) =>
        loadReceiver(options, buffer)
      )
    )

    this._resolveLoadStart = (options) =>
      resolveLoadStart([options])
  }

  //
  // Fully initialize an receiver instance, including:
  // Fetching settings from the Tronic CDN (by default).
  // Fetching all remote destinations configured by the user (if applicable).
  // Flushing buffered receiver events.
  // Loading all middleware.
  //
  // Note:️  This method should only be called *once* in your application.
  load(
    options: InitOptions,
  ): ReceiverBrowser {
    this._resolveLoadStart(options)
    return this
  }

  // Instantiates an object exposing Receiver methods.

  static load(
    options: InitOptions,
  ): ReceiverBrowser {
    return new ReceiverBrowser().load(options)
  }

  static standalone(
    writeKey: string,
    options?: InitOptions
  ): Promise<Receiver> {
    return ReceiverBrowser.load({ ...options, writeKey }).then((res) => res[0])
  }

}
