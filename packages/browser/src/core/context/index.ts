import {
  CoreContext,
  ContextCancelation,
  ContextFailedDelivery,
  SerializedContext,
  CancelationOptions,
} from '@tronic/receiver-core'
import { TronicEvent } from '../events/interfaces'
import { Stats } from '../stats'

export class Context extends CoreContext<TronicEvent> {
  static override system() {
    return new this({ type: 'track', event: 'system' })
  }
  constructor(event: TronicEvent, id?: string) {
    super(event, id, new Stats())
  }
}

export { ContextCancelation }
export type { ContextFailedDelivery, SerializedContext, CancelationOptions }
