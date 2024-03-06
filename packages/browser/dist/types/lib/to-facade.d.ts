import { Facade, Options } from '@segment/facade';
import { TronicEvent } from '../core/events';
export type TronicFacade = Facade<TronicEvent> & {
    obj: TronicEvent;
};
export declare function toFacade(evt: TronicEvent, options?: Options): TronicFacade;
//# sourceMappingURL=to-facade.d.ts.map