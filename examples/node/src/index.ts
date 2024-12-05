import { Receiver } from '@tronic/receiver-node';

const receiver = new Receiver({
  writeKey: '',
  host: 'https://api.tronic.app',
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

const userId = '';
const event = 'event-node-0';
const properties = {
  test: 'yes',
};

receiver.track({
  userId,
  event,
  properties,
});
