import { Receiver } from '../../core/receiver'
import { TronicFacade } from '../../lib/to-facade'
import { TronicSettings } from './index'

export function normalize(
  receiver: Receiver,
  json: ReturnType<TronicFacade['json']>,
  settings?: TronicSettings,
): object {
  const user = receiver.user()

  delete json.options

  json.writeKey = settings?.apiKey ?? receiver.options.writeKey ?? ''

  json.userId = json.userId || user.id()
  if (json.userId) {
    delete json.anonymousId
    json.anonymousId = json.anonymousId || user.anonymousId()
  }

  // json.sentAt = new Date()

  /*
  const failed = receiver.queue.failedInitializations || []
  if (failed.length > 0) {
    json._metadata = { failedInitializations: failed }
  }
   */

  return json
}
