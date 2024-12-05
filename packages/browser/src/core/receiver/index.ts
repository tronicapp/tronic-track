import {
  DispatchedEvent,
  TrackParams,
  PageParams,
  IdentifyParams,
  resolvePageArguments,
  resolveTrackArguments,
  resolveUserArguments,
} from '../arguments-resolver'
import type { FormArgs, LinkArgs } from '../auto-track'
import { isOffline } from '../connection'
import { Context } from '../context'
import { dispatch, Emitter } from '@tronic/receiver-core'
import {
  Callback,
  EventFactory,
  Plan,
  EventProperties,
  TronicEvent,
} from '../events'
import type { Plugin } from '../plugin'
import { EventQueue } from '../queue/event-queue'
import { Group, ID, User, UserOptions } from '../user'
import autoBind from '../../lib/bind-all'
import { PersistedPriorityQueue } from '../../lib/priority-queue/persisted'
import type {
  DestinationMiddlewareFunction,
  MiddlewareFunction,
} from '../../plugins/middleware'
import { version } from '../../generated/version'
import { PriorityQueue } from '../../lib/priority-queue'
import { getGlobal } from '../../lib/get-global'
import { ReceiverCore } from './interfaces'
import { HighEntropyHint } from '../../lib/client-hints/interfaces'
// import type { ExternalSettings } from '../../browser'
import {
  CookieOptions,
  MemoryStorage,
  UniversalStorage,
  StorageSettings,
  StoreType,
  applyCookieOptions,
  initializeStorages,
  isArrayOfStoreType,
} from '../storage'
import { PluginFactory } from '../../plugins/remote-loader'
// import { setGlobalReceiver } from '../../lib/global-receiver-helper'
import { popPageContext } from '../buffer'
import { MetricsOptions } from 'core/stats/remote-metrics'

type LegacyDestination = any;

function createDefaultQueue(
  name: string,
  retryQueue = false,
  disablePersistance = false
) {
  const maxAttempts = retryQueue ? 4 : 1
  const priorityQueue = disablePersistance
    ? new PriorityQueue(maxAttempts, [])
    : new PersistedPriorityQueue(maxAttempts, name)
  return new EventQueue(priorityQueue)
}

/*
export interface ReceiverSettings {
  writeKey: string
  timeout?: number
  plugins?: (Plugin | PluginFactory)[]
}
*/

export interface InitOptions {

  // export interface ReceiverSettings {
  writeKey?: string
  timeout?: number
  plugins?: (Plugin | PluginFactory)[]
  pluginSettings?: Record<string, any>

  // export interface ExternalSettings {
  metrics?: MetricsOptions

  remotePlugins?: any[] // RemotePlugin[]

  // Top level consent settings
  consentSettings?: {

    // All unique consent categories.
    // There can be categories in this array that are important for consent that are not included in any integration  (e.g. 2 cloud mode categories).
    // @example ["Receiver", "Advertising", "CAT001"]

    allCategories: string[]
  }

  // The settings for the Tronic Source.
  // If provided, `ReceiverBrowser` will not fetch remote settings
  // for the source.

  cdnSettings?: /* ExternalSettings & */ Record<string, unknown>
    // If provided, will override the default CDN.

  cdnURL?: string

  // Disables storing any data on the client-side via cookies or localstorage.
  // Defaults to `false`.
  disableClientPersistence?: boolean

  // Disables automatically converting ISO string event properties into Dates.
  // ISO string to Date conversions occur right before sending events to a classic device mode integration,
  // after any destination middleware have been ran.
  // Defaults to `false`.
  disableAutoISOConversion?: boolean
  initialPageview?: boolean
  cookie?: CookieOptions
  storage?: StorageSettings
  user?: UserOptions
  group?: UserOptions

  plan?: Plan
  retryQueue?: boolean
  obfuscate?: boolean

  // This callback allows you to update/mutate CDN Settings.
  // This is called directly after settings are fetched from the CDN.
  // updateCDNSettings?: (settings: ExternalSettings) => ExternalSettings

  // Disables or sets constraints on processing of query string parameters
  useQueryString?:
  | boolean
  | {
    aid?: RegExp
    uid?: RegExp
  }
  // Array of high entropy Client Hints to request. These may be rejected by the user agent - only required hints should be requested.
  highEntropyValuesClientHints?: HighEntropyHint[]
  // When using the snippet, this is the key that points to the global receiver instance (e.g. window.receiver).
  // default: receiver
  globalReceiverKey?: string
}

export class Receiver
  extends Emitter
  implements ReceiverCore {
  private _user: User
  private _group: Group
  private eventFactory: EventFactory
  private _debug = false
  private _universalStorage: UniversalStorage

  initialized = false
  options: InitOptions
  queue: EventQueue

  constructor(
    // settings: ReceiverSettings,
    options: InitOptions,
    queue?: EventQueue,
    user?: User,
    group?: Group
  ) {
    super()
    const cookieOptions = options?.cookie
    const disablePersistance = options?.disableClientPersistence ?? false

    this.options = options ?? {}
    this.options.timeout = this.options.timeout ?? 300

    this.queue =
      queue ??
      createDefaultQueue(
        `${options.writeKey}:event-queue`,
        options?.retryQueue,
        disablePersistance
      )

    const storageSetting = options?.storage
    this._universalStorage = this.createStore(
      disablePersistance,
      storageSetting,
      cookieOptions
    )

    this._user =
      user ??
      new User(
        {
          persist: !disablePersistance,
          storage: options?.storage,
          // Any User specific options override everything else
          ...options?.user,
        },
        cookieOptions
      ).load()

    this._group =
      group ??
      new Group(
        {
          persist: !disablePersistance,
          storage: options?.storage,
          // Any group specific options override everything else
          ...options?.group,
        },
        cookieOptions
      ).load()

    this.eventFactory = new EventFactory(this._user)

    autoBind(this)
  }

  user = (): User => {
    return this._user
  }

  // Creates the storage system based on the settings received
  private createStore(
    disablePersistance: boolean,
    storageSetting: InitOptions['storage'],
    cookieOptions?: CookieOptions | undefined
  ): UniversalStorage {
    // DisablePersistance option overrides all, no storage will be used outside of memory even if specified
    if (disablePersistance) {
      return new UniversalStorage([new MemoryStorage()])
    } else {
      if (storageSetting) {
        if (isArrayOfStoreType(storageSetting)) {
          // We will create the store with the priority for customer settings
          return new UniversalStorage(
            initializeStorages(
              applyCookieOptions(storageSetting.stores, cookieOptions)
            )
          )
        }
      }
    }
    // We default to our multi storage with priority
    return new UniversalStorage(
      initializeStorages([
        StoreType.LocalStorage,
        {
          name: StoreType.Cookie,
          settings: cookieOptions,
        },
        StoreType.Memory,
      ])
    )
  }

  get storage(): UniversalStorage {
    return this._universalStorage
  }

  async page(...args: PageParams): Promise<DispatchedEvent> {
    const pageCtx = popPageContext(args)
    const [category, page, properties, options, callback] =
      resolvePageArguments(...args)

    const tronicEvent = this.eventFactory.page(
      category,
      page,
      properties,
      options,
      pageCtx
    )

    return this._dispatch(tronicEvent, callback).then((ctx) => {
      this.emit('page', category, page, ctx.event.properties, ctx.event.options)
      return ctx
    })
  }

  async track(...args: TrackParams): Promise<DispatchedEvent> {
    const pageCtx = popPageContext(args)
    const [name, data, options, callback] = resolveTrackArguments(...args)

    const tronicEvent: any = this.eventFactory.track(
      name,
      data as EventProperties,
      options,
      pageCtx
    )

    return this._dispatch(tronicEvent, callback).then((ctx) => {
      this.emit('track', name, ctx.event.properties, ctx.event.options)
      return ctx
    })
  }

  async identify(...args: IdentifyParams): Promise<DispatchedEvent> {
    const pageCtx = popPageContext(args)
    const [id, _traits, options, callback] = resolveUserArguments(this._user)(
      ...args
    )

    this._user.identify(id, _traits)

    const tronicEvent = this.eventFactory.identify(
      this._user.id(),
      this._user.traits(),
      options,
      pageCtx
    )

    return this._dispatch(tronicEvent, callback).then((ctx) => {
      this.emit(
        'identify',
        ctx.event.userId,
        ctx.event.traits,
        ctx.event.options
      )
      return ctx
    })
  }

  async trackClick(...args: LinkArgs): Promise<Receiver> {
    const autotrack = await import(
      /* webpackChunkName: "auto-track" */ '../auto-track'
    )
    return autotrack.link.call(this, ...args)
  }

  async trackLink(...args: LinkArgs): Promise<Receiver> {
    const autotrack = await import(
      /* webpackChunkName: "auto-track" */ '../auto-track'
    )
    return autotrack.link.call(this, ...args)
  }

  async trackSubmit(...args: FormArgs): Promise<Receiver> {
    const autotrack = await import(
      /* webpackChunkName: "auto-track" */ '../auto-track'
    )
    return autotrack.form.call(this, ...args)
  }

  async trackForm(...args: FormArgs): Promise<Receiver> {
    const autotrack = await import(
      /* webpackChunkName: "auto-track" */ '../auto-track'
    )
    return autotrack.form.call(this, ...args)
  }

  async register(...plugins: Plugin[]): Promise<Context> {
    const ctx = Context.system()

    const registrations = plugins.map((xt) =>
      this.queue.register(ctx, xt, this)
    )
    await Promise.all(registrations)

    return ctx
  }

  async deregister(...plugins: string[]): Promise<Context> {
    const ctx = Context.system()

    const deregistrations = plugins.map((pl) => {
      const plugin = this.queue.plugins.find((p) => p.name === pl)
      if (plugin) {
        return this.queue.deregister(ctx, plugin, this)
      } else {
        ctx.log('warn', `plugin ${pl} not found`)
      }
    })

    await Promise.all(deregistrations)

    return ctx
  }

  debug(toggle: boolean): Receiver {
    // Make sure legacy ajs debug gets turned off if it was enabled before upgrading.
    if (toggle === false && localStorage.getItem('debug')) {
      localStorage.removeItem('debug')
    }
    this._debug = toggle
    return this
  }

  reset(): void {
    this._user.reset()
    this._group.reset()
    this.emit('reset')
  }

  timeout(timeout: number): void {
    this.options.timeout = timeout
  }

  private async _dispatch(
    event: TronicEvent,
    callback?: Callback
  ): Promise<DispatchedEvent> {
    const ctx = new Context(event)
    if (isOffline() && !this.options.retryQueue) {
      return ctx
    }
    return dispatch(ctx, this.queue, this, {
      callback,
      debug: this._debug,
      timeout: this.options.timeout,
    })
  }

  async addSourceMiddleware(fn: MiddlewareFunction): Promise<Receiver> {
    await this.queue.criticalTasks.run(async () => {
      const { sourceMiddlewarePlugin } = await import(
        /* webpackChunkName: "middleware" */ '../../plugins/middleware'
      )

      /*
      const integrations: Record<string, boolean> = {}
    this.queue.plugins.forEach((plugin) => {
      if (plugin.type === 'destination') {
        return (integrations[plugin.name] = true)
      }
    })
       */
      const plugin = sourceMiddlewarePlugin(fn) //, integrations)
      await this.register(plugin)
    })

    return this
  }

  // TODO: This does not have to return a promise?
  addDestinationMiddleware(
    integrationName: string,
    ...middlewares: DestinationMiddlewareFunction[]
  ): Promise<Receiver> {
    const legacyDestinations = this.queue.plugins.filter(
      (xt) => xt.name.toLowerCase() === integrationName.toLowerCase()
    ) as LegacyDestination[]

    legacyDestinations.forEach((destination) => {
      destination.addMiddleware(...middlewares)
    })
    return Promise.resolve(this)
  }

  setAnonymousId(id?: string): ID {
    return this._user.anonymousId(id)
  }

  async queryString(query: string): Promise<Context[]> {
    if (this.options.useQueryString === false) {
      return []
    }

    const { queryString } = await import(
      /* webpackChunkName: "queryString" */ '../query-string'
    )
    return queryString(this, query)
  }

  async ready(
    callback: Function = (res: Promise<unknown>[]): Promise<unknown>[] => res
  ): Promise<unknown> {
    return Promise.all(
      this.queue.plugins.map((i) => (i.ready ? i.ready() : Promise.resolve()))
    ).then((res) => {
      callback(res)
      return res
    })
  }

  async pageview(url: string): Promise<Receiver> {
    await this.page({ path: url })
    return this
  }

  get VERSION(): string {
    return version
  }

  // snippet function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  push(args: any[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const an = this as any
    const method = args.shift()
    if (method) {
      if (!an[method]) return
    }
    an[method].apply(this, args)
  }
}
