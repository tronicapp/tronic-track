import { pickPrefix } from './pickPrefix'
import { gracefulDecodeURIComponent } from './gracefulDecodeURIComponent'
import { Receiver } from '../receiver'
import { Context } from '../context'
import { isPlainObject } from '@tronic/receiver-core'

export interface QueryStringParams {
  [key: string]: string | null
}

export function queryString(
  receiver: Receiver,
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
    receiver.options.useQueryString
  )
    ? receiver.options.useQueryString
    : {}

  if (ajs_aid) {
    const anonId = Array.isArray(params.ajs_aid)
      ? params.ajs_aid[0]
      : params.ajs_aid

    if (aidPattern.test(anonId)) {
      receiver.setAnonymousId(anonId)
    }
  }

  if (ajs_uid) {
    const uid = Array.isArray(params.ajs_uid)
      ? params.ajs_uid[0]
      : params.ajs_uid

    if (uidPattern.test(uid)) {
      const traits = pickPrefix('ajs_trait_', params)

      // requires channelId
      // calls.push(receiver.identify(uid, traits))
    }
  }

  if (ajs_event) {
    const channelId = Array.isArray(params.ajs_channel_id)
      ? params.ajs_channel_id[0]
      : params.ajs_channel_id
    const userId = Array.isArray(params.ajs_user_id)
      ? params.ajs_user_id[0]
      : params.ajs_user_id
    const event = Array.isArray(params.ajs_event)
      ? params.ajs_event[0]
      : params.ajs_event
    const props = pickPrefix('ajs_prop_', params)
    calls.push(receiver.track(channelId, userId, event, props))
  }

  return Promise.all(calls)
}
