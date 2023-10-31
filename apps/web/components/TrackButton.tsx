'use client';

import { AnalyticsBrowser } from '@tronic/receiver-browser';

// We can export this instance to share with rest of our codebase.
const analytics = AnalyticsBrowser.load({ writeKey: '47ecad98-cb65-45de-97bd-9bec76de7c0b' })

const channelId = '2XWyaIasy88a5SJMoLKpkDuDt2O';
const userId = '2XWyaIZf7Tm2uQqa8fYH6GC0oYl';

// {"userId":"2XWyaIZf7Tm2uQqa8fYH6GC0oYl","event":"event0","properties":{"test":"property"},"channelId":"2XWyaIasy88a5SJMoLKpkDuDt2O","timestamp":"2023-10-31T18:28:57.818Z"}
// {"timestamp":"2023-10-31T18:30:28.173Z","channelId":"2XWyaIasy88a5SJMoLKpkDuDt2O","userId":"2XWyaIZf7Tm2uQqa8fYH6GC0oYl","event":"test-event0","properties":{"property0":"value0"}}

export const TrackButton = () => {
  return (
    <button onClick={() => analytics.track(
      channelId,
      userId,
      'test-event0',
      {
        property0: 'value0',
      }
    )}>Track</button>
  );
};
