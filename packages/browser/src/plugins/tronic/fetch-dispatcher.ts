import { fetch } from "../../lib/fetch";

export type Dispatcher = (url: string, body: object) => Promise<unknown>;

export type StandardDispatcherConfig = {
  keepalive?: boolean;
};

export default function (
  writeKey: string,
  config?: StandardDispatcherConfig
): {
  dispatch: Dispatcher;
} {
  function dispatch(url: string, body: object): Promise<unknown> {
    return fetch(url, {
      keepalive: config?.keepalive,
      headers: {
        // 'Content-Type': 'text/plain',
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(body),
    });
  }

  return {
    dispatch,
  };
}
