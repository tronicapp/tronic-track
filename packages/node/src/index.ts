export { Receiver } from './app/receiver-node';
export { Context } from './app/context';
export {
  type HTTPClient,
  FetchHTTPClient,
  type HTTPFetchRequest,
  type HTTPResponse,
  type HTTPFetchFn,
  type HTTPClientRequest,
} from './lib/http-client';
export type {
  Plugin,
  GroupTraits,
  UserTraits,
  TrackParams,
  IdentifyParams,
} from './app/types';
export type { ReceiverSettings } from './app/settings';

// export Receiver as both a named export and a default export (for backwards-compat. reasons)
import { Receiver } from './app/receiver-node';
export default Receiver;
