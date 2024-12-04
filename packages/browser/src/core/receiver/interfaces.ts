// import type { Receiver, ReceiverSettings, InitOptions } from '.'
import type { Plugin } from '../plugin'
import type {
  TrackParams,
  DispatchedEvent,
  IdentifyParams,
  // GroupParams,
} from '../arguments-resolver'
import type { Context } from '../context'
// import type { TronicEvent } from '../events'
import type { Group, User } from '../user'
// import type { LegacyIntegration } from '../../plugins/ajs-destination/types'
import { CoreReceiver } from '@tronic/receiver-core'

// we can define a contract because:
// - it gives us a neat place to put all our typedocs (they end up being inherited by the class that implements them).
// - it makes it easy to reason about what's being shared between browser and node

/*
// @deprecated
interface ReceiverClassicStubs {
  // @deprecated
  log(this: never): void
  // @deprecated
  addIntegrationMiddleware(this: never): void
  // @deprecated
  listeners(this: never): void
  // @deprecated
  addEventListener(this: never): void
  // @deprecated
  removeAllListeners(this: never): void
  // @deprecated
  removeListener(this: never): void
  // @deprecated
  removeEventListener(this: never): void
  // @deprecated
  hasListeners(this: never): void
  // @deprecated
  // This function is only used to add GA and Appcue, but these are already being added to Integrations by AJSN
  addIntegration(this: never): void
  // @deprecated
  add(this: never): void
}
 */

/*
// @deprecated
export interface ReceiverClassic extends ReceiverClassicStubs {
  // @deprecated
  initialize(
    settings?: ReceiverSettings,
    options?: InitOptions
  ): Promise<Receiver>

  // @deprecated
  noConflict(): Receiver

  // @deprecated
  normalize(msg: TronicEvent): TronicEvent

  // @deprecated
  readonly failedInitializations: string[]

  // @deprecated
  // pageview(url: string): Promise<Receiver>

  //  @deprecated
  readonly plugins: any

  // @deprecated
  readonly Integrations: Record<string, LegacyIntegration>
}
 */

// Interface implemented by concrete Receiver class (commonly accessible if you use "await" on ReceiverBrowser.load())
export interface ReceiverCore extends CoreReceiver {
  track(...args: TrackParams): Promise<DispatchedEvent>
  identify(...args: IdentifyParams): Promise<DispatchedEvent>
  // group(): Promise<Group>
  // group(...args: GroupParams): Promise<DispatchedEvent>
  user(): User
  register(...plugins: Plugin[]): Promise<Context>
  deregister(...plugins: string[]): Promise<Context>
  readonly VERSION: string
}

// Interface implemented by ReceiverBrowser (buffered version of receiver) (commonly accessible through ReceiverBrowser.load())
export type ReceiverBrowserCore = Omit<ReceiverCore, 'group' | 'user'> & {
  // group(): Promise<Group>
  // group(...args: GroupParams): Promise<DispatchedEvent>
  user(): Promise<User>
}
