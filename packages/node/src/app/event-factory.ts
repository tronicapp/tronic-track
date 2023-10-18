import { EventFactory } from '@tronic/receiver-core'
import { createMessageId } from '../lib/get-message-id'
import { SegmentEvent } from './types'

// use declaration merging to downcast CoreSegmentEvent without adding any runtime code.
// if/when we decide to add an actual implementation to NodeEventFactory that actually changes the event shape, we can remove this.
export interface NodeEventFactory {
  track(...args: Parameters<EventFactory['track']>): SegmentEvent
  identify(...args: Parameters<EventFactory['identify']>): SegmentEvent
}

export class NodeEventFactory extends EventFactory {
  constructor() {
    super({ createMessageId })
  }
}
