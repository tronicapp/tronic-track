import { pickPrefix } from './pickPrefix'
import { gracefulDecodeURIComponent } from './gracefulDecodeURIComponent'
import { Analytics } from '../analytics'
import { Context } from '../context'
import { isPlainObject } from '@tronic/receiver-core'

export interface QueryStringParams {
  [key: string]: string | null
}

export function queryString(
  analytics: Analytics,
  query: string
): Promise<Context[]> {
  const a = document.createElement('a')
  a.href = query
  const parsed = a.search.slice(1)
  const params = parsed.split('&').reduce((acc: QueryStringParams, str) => {
    const [k, v] = str.split('=')
    acc[k] = gracefulDecodeURIComponent(v)
    return acc
  }, {})

  const calls = []

  const { ajs_uid, ajs_event, ajs_aid } = params
  const { aid: aidPattern = /.+/, uid: uidPattern = /.+/ } = isPlainObject(
    analytics.options.useQueryString
  )
    ? analytics.options.useQueryString
    : {}

  if (ajs_aid) {
    const anonId = Array.isArray(params.ajs_aid)
      ? params.ajs_aid[0]
      : params.ajs_aid

    if (aidPattern.test(anonId)) {
      analytics.setAnonymousId(anonId)
    }
  }

  if (ajs_uid) {
    const uid = Array.isArray(params.ajs_uid)
      ? params.ajs_uid[0]
      : params.ajs_uid

    if (uidPattern.test(uid)) {
      const traits = pickPrefix('ajs_trait_', params)

      calls.push(analytics.identify(uid, traits))
    }
  }

  if (ajs_event) {
    const channelId = Array.isArray(params.ajs_channel_id)
      ? params.ajs_channel_id[0]
      : params.ajs_channel_id
    const event = Array.isArray(params.ajs_event)
      ? params.ajs_event[0]
      : params.ajs_event
    const props = pickPrefix('ajs_prop_', params)
    calls.push(analytics.track(channelId, event, props))
  }

  return Promise.all(calls)
}
