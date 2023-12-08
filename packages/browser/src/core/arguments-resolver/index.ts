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

/**
 * Helper for the track method
 */
export function resolveArguments(
  channelId: string,
  userId: string,
  eventName: string | TronicEvent,
  properties?: EventProperties | Callback,
  options?: Options | Callback,
  callback?: Callback
): [string, string, string, EventProperties | Callback, Options, Callback | undefined] {
  const args = [channelId, userId, eventName, properties, options, callback]

  if (!channelId || !isString(channelId)) {
    throw new Error('ChannelId missing')
  }

  if (!userId || !isString(userId)) {
    throw new Error('UserId missing')
  }

  const name = isPlainObject(eventName) ? eventName.event : eventName
  if (!name || !isString(name)) {
    throw new Error('Event missing')
  }

  const data = isPlainObject(eventName)
    ? eventName.properties ?? {}
    : isPlainObject(properties)
      ? properties
      : {}

  let opts: Options = {}
  if (!isFunction(options)) {
    opts = options ?? {}
  }

  if (isPlainObject(eventName) && !isFunction(properties)) {
    opts = properties ?? {}
  }

  const cb = args.find(isFunction) as Callback | undefined
  return [channelId, userId, name, data, opts, cb]
}

/**
 * Helper for group, identify methods
 */
export const resolveUserArguments = <T extends Traits, U extends User>(
  user: U
): ResolveUser<T> => {
  return (channelId,
    id,
    traits,
    options,
    callback): ReturnType<ResolveUser<T>> => {

    return [
      channelId,
      id,
      traits,
      options,
      callback,
    ];

    /*
        const values: {
          channelId?: string
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
          'channelId',
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
          values.channelId,
          values.id ?? user.id(),
          (values.traits ?? {}) as T,
          values.options ?? {},
          values.callback,
        ]
          */
    // return args;
  }
}

type ResolveUser<T extends Record<string, string>> = (
  channelId: string,
  id: string, // ID | object,
  traits: T, // | null, // Callback | null,
  options?: Options, // | Callback,
  callback?: Callback
) => [string, string, T, Options | undefined, Callback | undefined]

export type IdentifyParams = Parameters<ResolveUser<UserTraits>>
export type EventParams = Parameters<typeof resolveArguments>

export type DispatchedEvent = Context
