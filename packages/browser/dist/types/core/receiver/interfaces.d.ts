import type { Plugin } from '../plugin';
import type { TrackParams, DispatchedEvent, IdentifyParams } from '../arguments-resolver';
import type { Context } from '../context';
import type { User } from '../user';
import { CoreReceiver } from '@tronic/receiver-core';
export interface ReceiverCore extends CoreReceiver {
    track(...args: TrackParams): Promise<DispatchedEvent>;
    identify(...args: IdentifyParams): Promise<DispatchedEvent>;
    user(): User;
    register(...plugins: Plugin[]): Promise<Context>;
    deregister(...plugins: string[]): Promise<Context>;
    readonly VERSION: string;
}
export type ReceiverBrowserCore = Omit<ReceiverCore, 'group' | 'user'> & {
    user(): Promise<User>;
};
//# sourceMappingURL=interfaces.d.ts.map