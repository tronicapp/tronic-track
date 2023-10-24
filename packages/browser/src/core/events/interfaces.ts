import {
  CoreOptions,
  CoreEvent,
  Callback,
  Integrations,
  Plan,
  TrackPlan,
  PlanEvent,
  JSONArray,
  JSONValue,
  JSONPrimitive,
  JSONObject,
  GroupTraits,
  UserTraits,
  Traits,
} from '@tronic/receiver-core'

export interface Options extends CoreOptions {}

export type { GroupTraits, UserTraits, Traits }

export type EventProperties = Record<string, any>

export interface SegmentEvent extends CoreEvent {}

export type {
  Integrations,
  Plan,
  TrackPlan,
  PlanEvent,
  Callback,
  JSONArray,
  JSONValue,
  JSONPrimitive,
  JSONObject,
}
