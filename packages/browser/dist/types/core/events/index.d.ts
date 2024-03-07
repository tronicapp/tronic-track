import { ID, User } from '../user';
import { Options, EventProperties, Traits, TronicEvent } from './interfaces';
import { PageContext } from '../page';
export * from './interfaces';
export declare class EventFactory {
    user: User;
    constructor(user: User);
    track(eventName: string, channelId?: string, properties?: EventProperties, options?: Options, pageCtx?: PageContext): TronicEvent;
    identify(userId: ID, channelId?: string, traits?: Traits, options?: Options, pageCtx?: PageContext): TronicEvent;
    private baseEvent;
    /**
     * Builds the context part of an event based on "foreign" keys that
     * are provided in the `Options` parameter for an Event
     */
    private context;
    normalize(event: TronicEvent, pageCtx?: PageContext): TronicEvent;
}
//# sourceMappingURL=index.d.ts.map