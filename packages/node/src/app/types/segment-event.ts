import type { CoreEvent } from '@tronic/receiver-core'

type SegmentEventType = 'track' | 'identify'

export interface SegmentEvent extends CoreEvent {
  type: SegmentEventType
}
