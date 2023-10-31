import { fetch } from '../../lib/fetch'

export type Dispatcher = (url: string, body: object) => Promise<unknown>

export type StandardDispatcherConfig = {
  keepalive?: boolean
}

export default function (config?: StandardDispatcherConfig): {
  dispatch: Dispatcher
} {
  function dispatch(url: string, body: object): Promise<unknown> {
    return fetch(url, {
      keepalive: config?.keepalive,
      headers: {
        // 'Content-Type': 'text/plain',
        'Content-Type': 'application/json',
        'X-Api-Key': '5663b25b-f8c3-4ccb-8f1f-fe891d3d1e9a',
      },
      method: 'post',
      body: JSON.stringify(body),
    })
  }

  return {
    dispatch,
  }
}
