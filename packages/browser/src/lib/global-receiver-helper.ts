import { ReceiverSnippet } from '../browser/standalone-interface'

let _globalReceiverKey = 'receiver'

export function getGlobalReceiver(): ReceiverSnippet | undefined {
  return (window as any)[_globalReceiverKey]
}

export function setGlobalReceiverKey(key: string) {
  _globalReceiverKey = key
}

export function setGlobalReceiver(receiver: ReceiverSnippet): void {
  ;(window as any)[_globalReceiverKey] = receiver
}
