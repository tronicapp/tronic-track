import { Context } from '../context';
import { Callback, Options, EventProperties, TronicEvent, Traits, UserTraits } from '../events';
import { ID, User } from '../user';
export declare function resolveTrackArguments(eventOrEventName: string | TronicEvent, properties?: EventProperties | Callback, options?: Options | Callback, callback?: Callback): [string, /* string | undefined, */ /* string | undefined, */ EventProperties | Callback, Options, Callback | undefined];
export declare const resolveUserArguments: <T extends Traits, U extends User>(user: U) => ResolveUser<T>;
export declare function resolvePageArguments(category?: string | object, name?: string | object | Callback, properties?: EventProperties | Options | Callback | null, options?: Options | Callback, callback?: Callback): [
    string | null,
    string | null,
    EventProperties,
    Options,
    Callback | undefined
];
type ResolveUser<T extends Record<string, string>> = (id?: ID | object, traits?: T | Callback | null, options?: Options | Callback, callback?: Callback) => [/* string, */ ID, T, Options | undefined, Callback | undefined];
export type IdentifyParams = Parameters<ResolveUser<UserTraits>>;
export type TrackParams = Parameters<typeof resolveTrackArguments>;
export type PageParams = Parameters<typeof resolvePageArguments>;
export type DispatchedEvent = Context;
export {};
//# sourceMappingURL=index.d.ts.map