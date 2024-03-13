import { CoreEmitterContract, Emitter } from '@tronic/receiver-core'
import { Context } from './context'
import type { ReceiverSettings } from './settings'
import { TronicEvent } from './types'

// Map of emitter event names to method args.
export type NodeEmitterEvents = CoreEmitterContract<Context> & {
  initialize: [ReceiverSettings]
  call_after_close: [TronicEvent] // any event that did not get dispatched due to close
  http_request: [
    {
      url: string
      method: string
      headers: Record<string, string>
      body: Record<string, any>
    }
  ]
  drained: []
}

export class NodeEmitter extends Emitter<NodeEmitterEvents> {}
