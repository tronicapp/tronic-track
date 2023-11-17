import { loadScript } from './load-script'
import { getLegacyAJSPath } from './parse-cdn'

type CSPErrorEvent = SecurityPolicyViolationEvent & {
  disposition?: 'enforce' | 'report'
}
export const isReceiverCSPError = (e: CSPErrorEvent) => {
  return e.disposition !== 'report' && e.blockedURI.includes('cdn.tronic')
}

export async function loadAjsClassicFallback(): Promise<void> {
  console.warn(
    'Your CSP policy is missing permissions required in order to run Receiver.js 2.0',
    'https://tronic.com/docs'
  )
  console.warn('Reverting to Receiver.js 1.0')

  const classicPath = getLegacyAJSPath()
  await loadScript(classicPath)
}
