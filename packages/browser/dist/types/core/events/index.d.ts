import { User } from '../user';
import { EventProperties, Options, TronicEvent } from './interfaces';
import { PageContext } from '../page';
export * from './interfaces';
export declare class EventFactory {
    user: User;
    constructor(user: User);
    track(channelId: string, userId: string, event: string, properties?: EventProperties, pageCtx?: PageContext): TronicEvent;
    identify(channelId: string, userId: string, traits?: Record<string, string>, // Traits,
    options?: Options, pageCtx?: PageContext): TronicEvent;
    private baseEvent;
    /**
     * Builds the context part of an event based on "foreign" keys that
     * are provided in the `Options` parameter for an Event
     */
    private context;
    normalize(event: TronicEvent, pageCtx?: PageContext): TronicEvent;
}
//# sourceMappingURL=index.d.ts.map