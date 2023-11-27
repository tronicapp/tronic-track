import { ReceiverSnippet } from '../browser/standalone-interface';
/**
 * Gets the global receiver/buffer
 * @param key name of the window property where the buffer is stored (default: receiver)
 * @returns ReceiverSnippet
 */
export declare function getGlobalReceiver(): ReceiverSnippet | undefined;
/**
 * Replaces the global window key for the receiver/buffer object
 * @param key key name
 */
export declare function setGlobalReceiverKey(key: string): void;
/**
 * Sets the global receiver object
 * @param receiver receiver snippet
 */
export declare function setGlobalReceiver(receiver: ReceiverSnippet): void;
//# sourceMappingURL=global-receiver-helper.d.ts.map