import { Receiver } from '../../core/receiver'
import { LegacySettings } from '../../browser'
import { SegmentFacade } from '../../lib/to-facade'
import { TronicSettings } from './index'

export function normalize(
  receiver: Receiver,
  json: ReturnType<SegmentFacade['json']>,
  settings?: TronicSettings,
): object {
  const user = receiver.user()

  delete json.options

  json.writeKey = settings?.apiKey

  json.userId = json.userId || user.id()
  json.anonymousId = json.anonymousId || user.anonymousId()

  json.sentAt = new Date()

  const failed = receiver.queue.failedInitializations || []
  if (failed.length > 0) {
    json._metadata = { failedInitializations: failed }
  }

  return json
}
