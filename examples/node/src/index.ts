import { Receiver } from '@tronic/receiver-node';

const receiver = new Receiver({
  writeKey: '47ecad98-cb65-45de-97bd-9bec76de7c0b',
  host: 'dev-api.tronic.app',
});

const channelId = '2YUflBOLovgzw89JNtkxup30q5T';
const userId = '2WffqQkUnMk5qM5y90fGlzcPDAv';
const event = 'event-node-0';
const properties = {
  test: 'yes',
};

receiver.track({
  channelId,
  userId,
  event,
  properties,
});
