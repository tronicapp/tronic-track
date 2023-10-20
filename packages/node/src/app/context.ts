// create a derived class since we may want to add node specific things to Context later

import { CoreContext } from '@tronic/receiver-core'
import { SegmentEvent } from './types'

// While this is not a type, it is a definition
export class Context extends CoreContext<SegmentEvent> {
  static override system() {
    return new this({ channelId: '000', type: 'track', event: 'system' })
  }
}
