import {
  Facade,
  Identify,
  Options,
  Track,
} from '@segment/facade'
import { TronicEvent } from '../core/events'

export type SegmentFacade = Facade<TronicEvent> & {
  obj: TronicEvent
}

export function toFacade(evt: TronicEvent, options?: Options): SegmentFacade {
  let fcd = new Facade(evt, options)

  if (evt.type === 'track') {
    fcd = new Track(evt, options)
  }

  if (evt.type === 'identify') {
    fcd = new Identify(evt, options)
  }

  /*
  if (evt.type === 'page') {
    fcd = new Page(evt, options)
  }

  if (evt.type === 'alias') {
    fcd = new Alias(evt, options)
  }

  if (evt.type === 'group') {
    fcd = new Group(evt, options)
  }

  if (evt.type === 'screen') {
    fcd = new Screen(evt, options)
  }
   */

  Object.defineProperty(fcd, 'obj', {
    value: evt,
    writable: true,
  })

  return fcd as SegmentFacade
}
