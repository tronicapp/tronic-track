import { Receiver } from '../receiver';
import { Context } from '../context';
export interface QueryStringParams {
    [key: string]: string | null;
}
export declare function queryString(receiver: Receiver, query: string): Promise<Context[]>;
//# sourceMappingURL=index.d.ts.map