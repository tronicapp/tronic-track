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
    page(category: string | null, page: string | null, properties?: EventProperties, options?: CoreOptions): CoreEvent;
    track(event: string, properties?: EventProperties, options?: CoreOptions): CoreEvent;
    identify(userId: ID, traits?: UserTraits, options?: CoreOptions): CoreEvent;
    private baseEvent;
    private context;
    normalize(event: CoreEvent): CoreEvent;
}
//# sourceMappingURL=index.d.ts.map