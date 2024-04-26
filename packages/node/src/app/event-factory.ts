import { EventFactory } from '@tronic/receiver-core'
import { createMessageId } from '../lib/get-message-id'
import { TronicEvent } from './types'

// use declaration merging to downcast CoreTronicEvent without adding any runtime code.
// if/when we decide to add an actual implementation to NodeEventFactory that actually changes the event shape, we can remove this.
export interface NodeEventFactory {
  page(...args: Parameters<EventFactory['page']>): TronicEvent
  track(...args: Parameters<EventFactory['track']>): TronicEvent
  identify(...args: Parameters<EventFactory['identify']>): TronicEvent
}

export class NodeEventFactory extends EventFactory {
  constructor() {
    super({ createMessageId })
  }
}
