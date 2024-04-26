export interface CoreReceiver {
    page(...args: unknown[]): unknown;
    track(...args: unknown[]): unknown;
    identify(...args: unknown[]): unknown;
    register(...plugins: unknown[]): Promise<unknown>;
    deregister(...plugins: unknown[]): Promise<unknown>;
    readonly VERSION: string;
}
//# sourceMappingURL=index.d.ts.map