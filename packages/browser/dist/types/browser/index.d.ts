import { Receiver, /* ReceiverSettings, */ InitOptions } from '../core/receiver';
import { ReceiverBuffered } from '../core/buffer';
export declare class ReceiverBrowser extends ReceiverBuffered {
    private _resolveLoadStart;
    constructor();
    load(options: InitOptions): ReceiverBrowser;
    static load(options: InitOptions): ReceiverBrowser;
    static standalone(writeKey: string, options?: InitOptions): Promise<Receiver>;
}
//# sourceMappingURL=index.d.ts.map