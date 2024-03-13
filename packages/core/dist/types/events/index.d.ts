export * from './interfaces';
import { ID, User } from '../user';
import { EventProperties, CoreEvent, CoreOptions, UserTraits } from './interfaces';
interface EventFactorySettings {
    createMessageId: () => string;
    user?: User;
}
export declare class EventFactory {
    createMessageId: EventFactorySettings['createMessageId'];
    user?: User;
    constructor(settings: EventFactorySettings);
    track(channelId: string, event: string, properties?: EventProperties, options?: CoreOptions): CoreEvent;
    identify(channelId: string, userId: ID, traits?: UserTraits, options?: CoreOptions): CoreEvent;
    private baseEvent;
    private context;
    normalize(event: CoreEvent): CoreEvent;
}
//# sourceMappingURL=index.d.ts.map