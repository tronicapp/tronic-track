import { CoreContext, ContextCancelation, ContextFailedDelivery, SerializedContext, CancelationOptions } from '@tronic/receiver-core';
import { TronicEvent } from '../events/interfaces';
export declare class Context extends CoreContext<TronicEvent> {
    static system(): Context;
    constructor(event: TronicEvent, id?: string);
}
export { ContextCancelation };
export type { ContextFailedDelivery, SerializedContext, CancelationOptions };
//# sourceMappingURL=index.d.ts.map