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

// Helper for group, identify methods
export const resolveUserArguments = <T extends Traits, U extends User>(
  user: U
): ResolveUser<T> => {
  return (...args): ReturnType<ResolveUser<T>> => {

    /*
    const values: {
      id?: ID
      traits?: T | null
      options?: Options
      callback?: Callback
      } = {}
     */

    const x = args[1]

    return [
      // args[0],
      (args[0] ?? user.id()) as ID,
      (args[1] ?? {}) as T ,
      args[2] ?? {},
      args[3],
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
  // channelId: string,
  id?: ID | object,
  traits?: T | Callback | null,
  options?: Options | Callback,
  callback?: Callback
) => [/* string, */ ID, T, Options | undefined, Callback | undefined]

export type IdentifyParams = Parameters<ResolveUser<UserTraits>>
export type EventParams = Parameters<typeof resolveArguments>

export type DispatchedEvent = Context
