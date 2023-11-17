## Tronic Receiver NextJS Example

This repo provides an example of how to use the Tronic Receiver within a NextJS app.

````
import { ReceiverBrowser } from '@tronic/receiver-browser';

const receiver = ReceiverBrowser.load({ writeKey: '47ecad98-cb65-45de-97bd-9bec76de7c0b' })

const channelId = '2XWyaIasy88a5SJMoLKpkDuDt2O';
const userId = '2XWyaIZf7Tm2uQqa8fYH6GC0oYl';

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
````

To run:
```bash
yarn dev
```
