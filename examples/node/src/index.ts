import { Analytics } from '@tronic/receiver-node';

// instantiation
const analytics = new Analytics({ writeKey: '47ecad98-cb65-45de-97bd-9bec76de7c0b' });

const channelId = '2WffqYXFpaaDsZN21Wv3cEB92Bf';
const userId = '2WffqQkUnMk5qM5y90fGlzcPDAv';
const event = 'event0';
const properties = {
  test: 'yes',
};

analytics.track({
  channelId,
  userId,
  event,
  properties,
});
