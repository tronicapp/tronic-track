import {
  isFunction,
  isPlainObject,
  isString,
  isNumber,
} from '@tronic/receiver-core'
import { Context } from '../context'
import {
  Callback,
  JSONObject,
  Options,
  EventProperties,
  TronicEvent,
  Traits,
  UserTraits,
} from '../events'
import { ID, User } from '../user'

export function resolveTrackArguments(
  eventOrEventName: string | TronicEvent,
  // channelId?: string,
  properties?: EventProperties | Callback,
  options?: Options | Callback,
  callback?: Callback
): [string, /* string | undefined, */ EventProperties | Callback, Options, Callback | undefined] {
  const args = [eventOrEventName, /* channelId, */ properties, options, callback]

  const name = isPlainObject(eventOrEventName) ? eventOrEventName.event : eventOrEventName
  if (!name || !isString(name)) {
    throw new Error('Event missing')
  }

  const data = isPlainObject(eventOrEventName)
    ? eventOrEventName.properties ?? {}
    : isPlainObject(properties)
      ? properties
      : {}

  let opts: Options = {}
  if (!isFunction(options)) {
    opts = options ?? {}
  }

  if (isPlainObject(eventOrEventName) && !isFunction(properties)) {
    opts = properties ?? {}
  }

  const cb = args.find(isFunction) as Callback | undefined
  return [name, /* channelId, */ data, opts, cb]
}

export const resolveUserArguments = <T extends Traits, U extends User>(
  user: U
): ResolveUser<T> => {
  return (...args): ReturnType<ResolveUser<T>> => {

    const values: {
      id?: ID
      traits?: T | null
      options?: Options
      callback?: Callback
    } = {}

    // It's a stack so it's reversed so that we go through each of the expected arguments
    const orderStack: Array<keyof typeof values> = [
      'callback',
      'options',
      'traits',
      'id',
    ]

    // Read each argument and eval the possible values here
    for (const arg of args) {
      let current = orderStack.pop()
      if (current === 'id') {
        if (isString(arg) || isNumber(arg)) {
          values.id = arg.toString()
          continue
        }
        if (arg === null || arg === undefined) {
          continue
        }
        // First argument should always be the id, if it is not a valid value we can skip it
        current = orderStack.pop()
      }

      // Traits and Options
      if (
        (current === 'traits' || current === 'options') &&
        (arg === null || arg === undefined || isPlainObject(arg))
      ) {
        values[current] = arg as T
      }

      // Callback
      if (isFunction(arg)) {
        values.callback = arg as Callback
        break // This is always the last argument
      }
    }

    return [
      values.id ?? user.id(),
      (values.traits ?? {}) as T,
      values.options ?? {},
      values.callback,
    ]
  }
}

export function resolvePageArguments(
  category?: string | object,
  name?: string | object | Callback,
  properties?: EventProperties | Options | Callback | null,
  options?: Options | Callback,
  callback?: Callback
): [
    string | null,
    string | null,
    EventProperties,
    Options,
    Callback | undefined
  ] {
  let resolvedCategory: string | undefined | null = null
  let resolvedName: string | undefined | null = null
  const args = [category, name, properties, options, callback]

  const strings = args.filter(isString)
  if (strings[0] !== undefined && strings[1] !== undefined) {
    resolvedCategory = strings[0]
    resolvedName = strings[1]
  }

  if (strings.length === 1) {
    resolvedCategory = null
    resolvedName = strings[0]
  }

  const resolvedCallback = args.find(isFunction) as Callback | undefined

  const objects = args.filter((obj) => {
    if (resolvedName === null) {
      return isPlainObject(obj)
    }
    return isPlainObject(obj) || obj === null
  }) as Array<JSONObject | null>

  const resolvedProperties = (objects[0] ?? {}) as EventProperties
  const resolvedOptions = (objects[1] ?? {}) as Options

  return [
    resolvedCategory,
    resolvedName,
    resolvedProperties,
    resolvedOptions,
    resolvedCallback,
  ]
}

type ResolveUser<T extends Record<string, string>> = (
  // channelId: string,
  id?: ID | object,
  traits?: T | Callback | null,
  options?: Options | Callback,
  callback?: Callback
) => [/* string, */ ID, T, Options | undefined, Callback | undefined]

export type IdentifyParams = Parameters<ResolveUser<UserTraits>>
export type TrackParams = Parameters<typeof resolveTrackArguments>
export type PageParams = Parameters<typeof resolvePageArguments>

export type DispatchedEvent = Context
