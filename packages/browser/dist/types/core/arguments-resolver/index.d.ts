import { Context } from '../context';
import { Callback, Options, EventProperties, TronicEvent, Traits, UserTraits } from '../events';
import { ID, User } from '../user';
/**
 * Helper for the track method
 */
export declare function resolveArguments(channelId: string, userId: string, eventName: string | TronicEvent, properties?: EventProperties | Callback, options?: Options | Callback, callback?: Callback): [string, string, string, EventProperties | Callback, Options, Callback | undefined];
/**
 * Helper for group, identify methods
 */
export declare const resolveUserArguments: <T extends Traits, U extends User>(user: U) => ResolveUser<T>;
type ResolveUser<T extends Traits> = (channelId: string, id?: ID | object, traits?: T | Callback | null, options?: Options | Callback, callback?: Callback) => [ID, T, Options, Callback | undefined];
export type IdentifyParams = Parameters<ResolveUser<UserTraits>>;
export type EventParams = Parameters<typeof resolveArguments>;
export type DispatchedEvent = Context;
export {};
//# sourceMappingURL=index.d.ts.map