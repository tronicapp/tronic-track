import { getGlobal } from '../../lib/get-global'
import type { Receiver } from '../receiver'

const env = getGlobal()

// The code below assumes the inspector extension will use Object.assign
// to add the inspect interface on to this object reference (unless the
// extension code ran first and has already set up the variable)
const inspectorHost: {
  attach: (receiver: Receiver) => void
} = ((env as any)['__TRONIC_INSPECTOR__'] ??= {})

export const attachInspector = (receiver: Receiver) =>
  inspectorHost.attach?.(receiver as any)
