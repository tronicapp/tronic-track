'use client';

import { ReceiverBrowser } from '@tronic/receiver-browser';

const writeKey = '';
const channelId = '';
const userId = '';

const receiver = ReceiverBrowser.load({ writeKey })

export const TrackButton = () => {
  return (
    <button onClick={() => receiver.track(
      channelId,
      userId,
      'test-event0',
      {
        property0: 'value0',
      }
    )}>Track</button>
  );
};
