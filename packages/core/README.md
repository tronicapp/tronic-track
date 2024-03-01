# @tronic/receiver-core

This provides shared code used by both the browser and node packages. In particular:

1. A logger
2. An interface to collect performance metrics
3. A plugin interface
4. An event emitter which allows for add listeners to lifecycle events
5. An general event interface that creates events with standardized metadata such as a timestamp
3. A queue with priority and backoff
3. A general User interface
4. Validation utilities

## Lifecycle events

- delivery_success
- delivery_failure
- delivery_retry
- message_enriched
- message_delivered
- flush

# APIs

1. Identify - Use the identify method to link your users and their actions, to a recognizable userId and traits.
2. Track - The Track method lets you record actions your users perform.

## Managing identity
User Id / Anonymous Id; Localstorage persistence; Cookies; Automatic identity tracking across pages; Default Storage Priority: LocalStorage -> Cookie -> InMemory

## Context
Context is a dictionary of extra information that provides useful context about a datapoint, for example the user’s ip address or locale.

## Utility methods
- load - You can load a buffered version of receiver.js that requires you to call load explicitly before receiver.js initiates any network activity. This is useful if you want to, for example, wait for user consent before you fetch tracking destinations or send buffered events to Tronic. You can also use load if you fetch some settings asynchronously.
- ready - Provides the ability to call custom code once receiver.js and it's plugins are initialized
- register/deregister - Adds or remove plugins to the the plugin stack
- on/once/off - Use the on method to set and unset listeners for lifecycle events and run your own custom code.
- debug - Calling the debug method turns on debug mode, which logs helpful messages to the console.
- reset - Clears the stored user data
- timeout - Sets the length (in milliseconds) of callbacks and helper functions

## Middleware
The first function (Source Middleware) allows you to manipulate the payload and filter events on a per-source basis, while the second function (Destination Middleware) allows this on a per destination basis. Middlewares run in the browser.

## Plugins
The plugins you write can augment functionality, enrich data, and control the flow and delivery of events. From modifying event payloads to changing receiver functionality, plugins help to speed up the process of getting things done.

Though middlewares function the same as plugins, it’s best to use plugins as they are easier to implement and are more testable.

There are two different categories of plugins:
- Critical Plugins: Receiver.js expects this plugin to be loaded before starting event delivery. Failure to load a critical plugin halts event delivery.
- Non-critical Plugins: Receiver.js can start event delivery before this plugin finishes loading. This means your plugin can fail to load independently from all other plugins.

Non-critical plugins run through a timeline that executes in order of insertion based on the entry type. Tronic has these four entry types of non-critical plugins: enrichment, destination, after, utility.

Plugins must be registered by calling the register utility function.

## Helper functions
- Track link - trackLink is a helper method that attaches the track call as a handler to a link.
- Track form - trackForm is a helper method that binds a track call to a form submission.

## Querystring API
Receiver.js can trigger Track and Identify events based on the URL query string. You can use this when tracking email click-throughs, social media clicks, and digital advertising.

## Single Page Applications
You can manually set the referrer and URL in your Receiver calls by updating the context object.

## Retries
When enabled, receiver.js automatically retries network and server errors. With persistent retries, receiver.js can:
- Support offline tracking. receiver.js queues your events and delivers them when the user comes back online.
- Better handle network issues. When your application can’t connect to the Tronic API, Tronic continues to store the events on the browser to prevent data loss.

Receiver.js stores events in localStorage and falls back to in-memory storage when localStorage is unavailable. It retries up to 10 times with an incrementally increasing back-off time between each retry. Receiver.js queues up to 100 events at a time to avoid using too much of the device's local storage.

Receiver.js tries to detect when a page is about to be closed and saves pending events to localStorage. When the user navigates to another page within the same domain, Receiver.js attempts to send any events it finds in localStorage.

## Batching
Batching support is not enabled at this time.

## Delivery
Receiver.js does its best to deliver the queued events before the browser closes, but the delivery isn’t guaranteed.

Upon receiving the beforeunload browser event, Receiver.js attempts to flush the queue using fetch requests with keepalive set to true. Since the max size of keepalive payloads is limited to 64 KB, if the queue size is bigger than 64 KB at the time the browser closes, then there is a chance of losing a subset of the queued events. Reducing the batch size or timeout will alleviate this issue, but that will be a trade-off decision.

## Core
Context

Event

Emitter

Priority Queue

Event Queue
register - loads plugin
deregister

Task

Receiver
ctx
queue
emitter - metrics/progress
options

Validation

Logger

Stats
guage
increment

## Browser

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
export const TRONIC_API_HOST = 'prod-api.tronic.app'

Stats
RemoteMetrics

# Node

# Script tag

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
