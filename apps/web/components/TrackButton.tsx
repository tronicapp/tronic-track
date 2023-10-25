'use client';

import { AnalyticsBrowser } from '@tronic/receiver-browser';

// We can export this instance to share with rest of our codebase.
const analytics = AnalyticsBrowser.load({ writeKey: '47ecad98-cb65-45de-97bd-9bec76de7c0b' })

export const TrackButton = () => {
  return (
    <button onClick={() => analytics.track('hello world')}>Track</button>
  );
};
