export class ReceiverNode {
  static load(): Promise<never> {
    return Promise.reject(
      new Error('ReceiverNode is not available in browsers.')
    )
  }
}
