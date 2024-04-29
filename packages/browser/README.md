# @tronic/receiver-browser

Receiver
Creates priority queue (${settings.writeKey}:event-queue)
Create storage
Gets users or group
Creates event factory
Has methods to dispatch main events + generics trackClick, trackLink, trackForm, trackSubmit (auto-track)
register/deregister plugins - via event queue
add source / destination middleware
ready promise
VERSION
push for snippet

Priority Queue - persisted option

Event Queue - name/string -> PersistedPriorityQueue or your own

Storage
supports multi-storage (memory, local, cookie)

Auto-track
Attaches addEventListeners

Callback
pass-thru

Connection
isOnline/isOffline

Environment
isBrowser/isServer

Context
extends CoreContext, overrides NullStats

Events
pass-thru, export interface TronicEvent extends CoreEvent {}
overrides/copies track/identify from core and adds page context

Plugin
plugin types - 'before' | 'after' | 'destination' | 'enrichment' | 'utility'
2 built-in plugins - validation (before) and envEnrichment (before - utm) - track, identify

envEnrichment
ctx.event.context
--page.search
--userAgent
--userAgentData
--locale
--library.{name|version}
--campaign (utm)
--amp { id: amp }
--referrer (ad)
--timezone

Inspector
browser extension?

Page Context

Constants
export const TRONIC_API_HOST = 'api.tronic.app'

Stats
RemoteMetrics

## snippet

Uses UMD packages/browser/src/browser/standalone.ts

===> 1) packages/browser/src/browser/standalone.ts

CSP / addEventListener securitypolicyviolation
polyfill if needed
attempt(install)

===> 2) packages/browser/src/browser/standalone-receiver.ts

install getWriteKey, _writeKey, _loadOptions
calls ReceiverBrowser.standalone(writeKey, options)

===> 3) packages/browser/src/browser/index.ts
class ReceiverBrowser extends ReceiverBuffered
static standalone -> ReceiverBrowser.load w/ { writeKey }
ReceiverBrowser.load -> new ReceiverBrowser().load(settings, options)
load -> _resolveLoadStart (deferred promise loadStart resolver)
loadStart.then loadReceiver

async function loadReceiver:
settings - data from settings.cdnsettings or backend endpoint /settings
if options.disable, NullAnalytics
can override the global receiver key
can set the global cdn url
can record the initial page view
load settings from settings.cdnSettings or backend endpoint
can updateCDNSettings if set on options
if options.disable is a function, call it with settings to determined disabled

new Receiver (core/receiver/index.ts)
attachInspector
get plugins and classIntegrations from settings
Stats.initRemoteMetrics
flushPreBuffer(receiver, preInitBuffer) before plugins are registered

registerPlugins
hasTsubMiddleware - '../plugins/routing-middleware'
hasLegacyDestinations(legacySettings) || legacyIntegrationSources.length > 0 - '../plugins/ajs-destination'
legacySettings.legacyVideoPluginsEnabled - '../plugins/legacy-video-plugins'
opts.plan?.track - '../plugins/schema-filter'
remoteLoader
if (schemaFilter) { toRegister.push(schemaFilter) }
shouldIgnoreSegmentio?

const ctx = await analytics.register(...toRegister)
this.queue.register(ctx, xt, this)

legacySettings.enabledMiddleware - '../plugins/remote-middleware' - analytics.addSourceMiddleware(mdw)

ajs_ query string can cause identify or track calls
receiver.initialized = true
initialPageView? currently disabled
flushFinalBuffer(receiver, preInitBuffer)

plugins come in via settings.plugins
const ctx = await registerPlugins() -> const ctx = await receiver.register(...toRegister)

returns [receiver, ctx]

src/lib/global-receiver-helper.ts
set window.[name]

// ability to add source middleware
var smw1 = function ({}) {}
analytics.addSourceMiddleware(smw1);

addSourceMiddleware wraps a middleware function into a new before plugin and registers it.

ajs-destination
Classic Destination - ClassicIntegrationSource = | ClassicIntegrationGenerator | ClassicIntegrationBuilder
https://github.com/segmentio/analytics.js-integrations/blob/master/integrations/google-analytics/lib/index.js
wraps a window.ga call
