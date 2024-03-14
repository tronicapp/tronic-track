import { Receiver } from '@tronic/receiver-node';

const receiver = new Receiver({
  writeKey: '73112b53-bb20-49ce-b46a-9c0fa1c6c862',
  host: 'https://dev-api.tronic.app',
  flushInterval: 1000,
});

console.log('example::receiver', receiver);

receiver.on('initialize', (settings) => {
  console.log('example::initialize', settings);
});
receiver.on('track', (obj) => {
  console.log('example::track', obj);
});
receiver.on('identify', (obj) => {
  console.log('example::identify', obj);
});
receiver.on('error', (obj) => {
  console.log('example::error', obj);
});
receiver.on('http_request', (obj) => {
  console.log('example::http_request', obj);
});

const channelId = '2dbPS5wwHppJS0w8HNihG15tlO5';
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
