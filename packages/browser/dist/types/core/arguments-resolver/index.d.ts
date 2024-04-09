import { Context } from '../context';
import { Callback, Options, EventProperties, TronicEvent, Traits, UserTraits } from '../events';
import { ID, User } from '../user';
/**
 * Helper for the track method
 */
export declare function resolveArguments(eventOrEventName: string | TronicEvent, properties?: EventProperties | Callback, options?: Options | Callback, callback?: Callback): [string, /* string | undefined, */ /* string | undefined, */ EventProperties | Callback, Options, Callback | undefined];
export declare const resolveUserArguments: <T extends Traits, U extends User>(user: U) => ResolveUser<T>;
type ResolveUser<T extends Record<string, string>> = (id?: ID | object, traits?: T | Callback | null, options?: Options | Callback, callback?: Callback) => [/* string, */ ID, T, Options | undefined, Callback | undefined];
export type IdentifyParams = Parameters<ResolveUser<UserTraits>>;
export type EventParams = Parameters<typeof resolveArguments>;
export type DispatchedEvent = Context;
export {};
//# sourceMappingURL=index.d.ts.map