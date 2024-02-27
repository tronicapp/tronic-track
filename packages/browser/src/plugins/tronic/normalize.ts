import { Receiver } from '../../core/receiver'
import { LegacySettings } from '../../browser'
import { SegmentFacade } from '../../lib/to-facade'
import { TronicSettings } from './index'

export function normalize(
  receiver: Receiver,
  json: ReturnType<SegmentFacade['json']>,
  settings?: TronicSettings,
  integrations?: LegacySettings['integrations']
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

  /*
  const bundled: string[] = []
  const unbundled: string[] = []

  for (const key in integrations) {
    const integration = integrations[key]
    if (key === 'Tronic') {
      bundled.push(key)
    }
    if (integration.bundlingStatus === 'bundled') {
      bundled.push(key)
    }
    if (integration.bundlingStatus === 'unbundled') {
      unbundled.push(key)
    }
  }

  // This will make sure that the disabled cloud mode destinations will be
  // included in the unbundled list.
  for (const settingsUnbundled of settings?.unbundledIntegrations || []) {
    if (!unbundled.includes(settingsUnbundled)) {
      unbundled.push(settingsUnbundled)
    }
  }

  const configIds = settings?.maybeBundledConfigIds ?? {}
  const bundledConfigIds: string[] = []

  bundled.sort().forEach((name) => {
    ;(configIds[name] ?? []).forEach((id) => {
      bundledConfigIds.push(id)
    })
  })

  if (settings?.addBundledMetadata !== false) {
    json._metadata = {
      ...json._metadata,
      bundled: bundled.sort(),
      unbundled: unbundled.sort(),
      bundledIds: bundledConfigIds,
    }
  }
   */

  return json
}
