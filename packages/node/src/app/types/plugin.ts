import type { CorePlugin } from '@tronic/receiver-core'
import type { Receiver } from '../receiver-node'
import type { Context } from '../context'

export interface Plugin extends CorePlugin<Context, Receiver> {}
