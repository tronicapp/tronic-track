import { uuid } from './uuid'

// get a unique messageId with a very low chance of collisions
//using @lukeed/uuid/secure uses the node crypto module, which is the fastest
export const createMessageId = (): string => {
  return `node-${Date.now()}-${uuid()}`
}
