import { Receiver } from '../core/receiver'
import { Context } from '../core/context'
import { validation } from '../plugins/validation'
import { receiverNode } from '../plugins/receiver-node'
import { Plugin } from '../core/plugin'
import { EventQueue } from '../core/queue/event-queue'
import { PriorityQueue } from '../lib/priority-queue'

export class ReceiverNode {
  static async load(settings: {
    writeKey: string
  }): Promise<[Receiver, Context]> {
    const cookieOptions = {
      persist: false,
    }

    const queue = new EventQueue(new PriorityQueue(3, []))
    const options = { user: cookieOptions, group: cookieOptions }
    const receiver = new Receiver(settings, options, queue)

    const nodeSettings = {
      writeKey: settings.writeKey,
      name: 'receiver-node-next',
      type: 'after' as Plugin['type'],
      version: 'latest',
    }

    const ctx = await receiver.register(
      validation,
      receiverNode(nodeSettings)
    )
    receiver.emit('initialize', settings, cookieOptions ?? {})

    return [receiver, ctx]
  }
}
