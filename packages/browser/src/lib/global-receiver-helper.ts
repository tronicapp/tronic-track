import { ReceiverSnippet } from '../browser/standalone-interface'

/**
 * Stores the global window receiver key
 */
let _globalReceiverKey = 'receiver'

/**
 * Gets the global receiver/buffer
 * @param key name of the window property where the buffer is stored (default: receiver)
 * @returns ReceiverSnippet
 */
export function getGlobalReceiver(): ReceiverSnippet | undefined {
  return (window as any)[_globalReceiverKey]
}

/**
 * Replaces the global window key for the receiver/buffer object
 * @param key key name
 */
export function setGlobalReceiverKey(key: string) {
  _globalReceiverKey = key
}

/**
 * Sets the global receiver object
 * @param receiver receiver snippet
 */
export function setGlobalReceiver(receiver: ReceiverSnippet): void {
  ;(window as any)[_globalReceiverKey] = receiver
}
