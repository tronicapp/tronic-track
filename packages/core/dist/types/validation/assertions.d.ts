import { CoreEvent } from '../events';
export declare function assertUserIdentity(event: CoreEvent): void;
export declare function assertEventExists(event?: CoreEvent | null): asserts event is CoreEvent;
export declare function assertEventType(event: CoreEvent): void;
export declare function assertTrackEventName(event: CoreEvent): void;
export declare function assertTrackEventProperties(event: CoreEvent): void;
export declare function assertTraits(event: CoreEvent): void;
export declare function validateEvent(event?: CoreEvent | null): void;
//# sourceMappingURL=assertions.d.ts.map