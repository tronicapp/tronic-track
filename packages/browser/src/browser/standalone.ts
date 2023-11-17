/* eslint-disable @typescript-eslint/no-floating-promises */
import { getCDN, setGlobalCDNUrl } from '../lib/parse-cdn'
import { setVersionType } from '../lib/version-type'

if (process.env.ASSET_PATH) {
  if (process.env.ASSET_PATH === '/dist/umd/') {
    // @ts-ignore
    __webpack_public_path__ = '/dist/umd/'
  } else {
    const cdn = getCDN()
    setGlobalCDNUrl(cdn)

    // @ts-ignore
    __webpack_public_path__ = cdn
      ? cdn + '/tronic-receiver/bundles/'
      : 'https://cdn.tronic.com/tronic-receiver/bundles/'
  }
}

setVersionType('web')

import { install } from './standalone-receiver'
import '../lib/csp-detection'
import { shouldPolyfill } from '../lib/browser-polyfill'
import { RemoteMetrics } from '../core/stats/remote-metrics'
import { embeddedWriteKey } from '../lib/embedded-write-key'
import {
  loadAjsClassicFallback,
  isReceiverCSPError,
} from '../lib/csp-detection'

let ajsIdentifiedCSP = false

const sendErrorMetrics = (tags: string[]) => {
  // this should not be instantied at the root, or it will break ie11.
  const metrics = new RemoteMetrics()
  metrics.increment('receiver_js.invoke.error', [
    ...tags,
    `wk:${embeddedWriteKey()}`,
  ])
}

function onError(err?: unknown) {
  console.error('[receiver.js]', 'Failed to load Receiver.js', err)
  sendErrorMetrics([
    'type:initialization',
    ...(err instanceof Error
      ? [`message:${err?.message}`, `name:${err?.name}`]
      : []),
  ])
}

document.addEventListener('securitypolicyviolation', (e) => {
  if (ajsIdentifiedCSP || !isReceiverCSPError(e)) {
    return
  }
  ajsIdentifiedCSP = true
  sendErrorMetrics(['type:csp'])
  loadAjsClassicFallback().catch(console.error)
})

/**
 * Attempts to run a promise and catch both sync and async errors.
 **/
async function attempt<T>(promise: () => Promise<T>) {
  try {
    const result = await promise()
    return result
  } catch (err) {
    onError(err)
  }
}

if (shouldPolyfill()) {
  // load polyfills in order to get AJS to work with old browsers
  const script = document.createElement('script')
  script.setAttribute(
    'src',
    'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.7.0/polyfill.min.js'
  )

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () =>
      document.body.appendChild(script)
    )
  } else {
    document.body.appendChild(script)
  }

  script.onload = function (): void {
    attempt(install)
  }
} else {
  attempt(install)
}
