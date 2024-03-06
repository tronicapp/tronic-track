"use strict";
// import { ExternalSettings } from '../browser'
// import { JSONObject, Options } from '../core/events/interfaces'
// Merge external settings and initialized Integration option overrides.
// This will merge any options that were passed from initialization into
// overrides for settings that are returned by the Tronic CDN.
// i.e. this allows for passing options directly into destinations from
// the Receiver constructor.
/*
export function mergedOptions(
  settings: ExternalSettings,
  options: Options
): Record<string, JSONObject> {

  const optionOverrides = Object.entries(options.integrations ?? {}).reduce(
    (overrides, [integration, options]) => {
      if (typeof options === 'object') {
        return {
          ...overrides,
          [integration]: options,
        }
      }

      return {
        ...overrides,
        [integration]: {},
      }
    },
    {} as Record<string, JSONObject>
  )

  return Object.entries(settings.integrations).reduce(
    (integrationSettings, [integration, settings]) => {
      return {
        ...integrationSettings,
        [integration]: {
          ...settings,
          ...optionOverrides[integration],
        },
      }
    },
    {} as Record<string, JSONObject>
  )

  return {} as Record<string, JSONObject>
}
    */
//# sourceMappingURL=merged-options.js.map