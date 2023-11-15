import type { CoreEvent } from '@tronic/receiver-core'

type TronicEventType = 'track' | 'identify'

export interface TronicEvent extends CoreEvent {
  type: TronicEventType
}
