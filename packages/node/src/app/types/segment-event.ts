import type { CoreEvent } from '@tronic/analytics-core'

type SegmentEventType = 'track' | 'identify'

export interface SegmentEvent extends CoreEvent {
  type: SegmentEventType
}
