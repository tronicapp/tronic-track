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

  const { rjs_uid, rjs_event, rjs_aid } = params
  const { aid: aidPattern = /.+/, uid: uidPattern = /.+/ } = isPlainObject(
    receiver.options.useQueryString
  )
    ? receiver.options.useQueryString
    : {}

  if (rjs_aid) {
    const anonId = Array.isArray(params.rjs_aid)
      ? params.rjs_aid[0]
      : params.rjs_aid

    if (aidPattern.test(anonId)) {
      receiver.setAnonymousId(anonId)
    }
  }

  if (rjs_uid) {
    const uid = Array.isArray(params.rjs_uid)
      ? params.rjs_uid[0]
      : params.rjs_uid

    if (uidPattern.test(uid)) {
      const traits = pickPrefix('rjs_trait_', params)

      calls.push(receiver.identify(uid, traits))
    }
  }

  if (rjs_event) {
    const userId = Array.isArray(params.rjs_user_id)
      ? params.rjs_user_id[0]
      : params.rjs_user_id
    const event = Array.isArray(params.rjs_event)
      ? params.rjs_event[0]
      : params.rjs_event
    const props = pickPrefix('rjs_prop_', params)
    calls.push(receiver.track(userId, event, props))
  }

  return Promise.all(calls)
}
