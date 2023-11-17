export interface CoreReceiver {
  track(...args: unknown[]): unknown
  identify(...args: unknown[]): unknown
  register(...plugins: unknown[]): Promise<unknown>
  deregister(...plugins: unknown[]): Promise<unknown>
  readonly VERSION: string
}
