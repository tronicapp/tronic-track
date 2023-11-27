import { Receiver, InitOptions } from '../core/receiver';
export interface ReceiverSnippet extends ReceiverStandalone {
    load: (writeKey: string, options?: InitOptions) => void;
}
export interface ReceiverStandalone extends Receiver {
    _loadOptions?: InitOptions;
    _writeKey?: string;
    _cdn?: string;
}
//# sourceMappingURL=standalone-interface.d.ts.map