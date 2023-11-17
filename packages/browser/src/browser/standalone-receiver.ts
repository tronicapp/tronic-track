import { ReceiverBrowser } from '.'
import { embeddedWriteKey } from '../lib/embedded-write-key'
import { ReceiverSnippet } from './standalone-interface'
import {
  getGlobalReceiver,
  setGlobalReceiver,
} from '../lib/global-receiver-helper'

function getWriteKey(): string | undefined {
  if (embeddedWriteKey()) {
    return embeddedWriteKey()
  }

  const receiver = getGlobalReceiver()
  if (receiver?._writeKey) {
    return receiver._writeKey
  }

  const regex = /http.*\/receiver\.js\/v1\/([^/]*)(\/platform)?\/receiver.*/
  const scripts = Array.prototype.slice.call(
    document.querySelectorAll('script')
  )
  let writeKey: string | undefined = undefined

  for (const s of scripts) {
    const src = s.getAttribute('src') ?? ''
    const result = regex.exec(src)

    if (result && result[1]) {
      writeKey = result[1]
      break
    }
  }

  if (!writeKey && document.currentScript) {
    const script = document.currentScript as HTMLScriptElement
    const src = script.src

    const result = regex.exec(src)

    if (result && result[1]) {
      writeKey = result[1]
    }
  }

  return writeKey
}

export async function install(): Promise<void> {
  const writeKey = getWriteKey()
  const options = getGlobalReceiver()?._loadOptions ?? {}
  if (!writeKey) {
    console.error(
      'Failed to load Write Key. Make sure to use the latest version of the Tronic snippet, which can be found in your source settings.'
    )
    return
  }

  setGlobalReceiver(
    (await ReceiverBrowser.standalone(writeKey, options)) as ReceiverSnippet
  )
}
