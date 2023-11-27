import { Facade, Options } from '@segment/facade';
import { TronicEvent } from '../core/events';
export type SegmentFacade = Facade<TronicEvent> & {
    obj: TronicEvent;
};
export declare function toFacade(evt: TronicEvent, options?: Options): SegmentFacade;
//# sourceMappingURL=to-facade.d.ts.map