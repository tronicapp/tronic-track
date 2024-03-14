// create a derived class since we may want to add node specific things to Context later

import { CoreContext } from '@tronic/receiver-core'
import { TronicEvent } from './types'

// While this is not a type, it is a definition
export class Context extends CoreContext<TronicEvent> {
  static override system() {
    return new this({ type: 'track', event: 'system' })
  }
}
