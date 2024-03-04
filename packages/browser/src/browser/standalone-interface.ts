import { Receiver, InitOptions } from '../core/receiver'

export interface ReceiverStandalone extends Receiver {
  _loadOptions?: InitOptions
  _writeKey?: string
  _cdn?: string
}

export interface ReceiverSnippet extends ReceiverStandalone {
  load: (options?: InitOptions) => void
}
