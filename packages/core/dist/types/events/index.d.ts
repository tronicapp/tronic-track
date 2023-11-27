export * from './interfaces';
import { ID, User } from '../user';
import { EventProperties, CoreEvent, UserTraits } from './interfaces';
interface EventFactorySettings {
    createMessageId: () => string;
    user?: User;
}
export declare class EventFactory {
    createMessageId: EventFactorySettings['createMessageId'];
    user?: User;
    constructor(settings: EventFactorySettings);
    track(channelId: string, userId: string, event: string, properties?: EventProperties): CoreEvent;
    identify(channelId: string, userId: ID, traits?: UserTraits): CoreEvent;
    private baseEvent;
    /**
     * Builds the context part of an event based on "foreign" keys that
     * are provided in the `Options` parameter for an Event
     */
    private context;
    normalize(event: CoreEvent): CoreEvent;
}
//# sourceMappingURL=index.d.ts.map