# @tronic/receiver-node

```
const { Receiver } = require('@tronic/receiver-node')

const channelId = '2YUflBOLovgzw89JNtkxup30q5T';
const userId = '2WffqQkUnMk5qM5y90fGlzcPDAv';
const event = 'event-node-0';
const properties = {
  test: 'yes',
};

const receiver = new Receiver({
  writeKey: '<MY_WRITE_KEY>',
  host: '<MY_HOST>',
});

app.post('/login', (req, res) => {
   receiver.identify({
      userId: req.body.userId,
      previousId: req.body.previousId
  })
  res.sendStatus(200)
})

app.post('/cart', (req, res) => {
  receiver.track({
    userId: req.body.userId,
    event: 'Add to cart',
    properties: { productId: '123456' }
  })
   res.sendStatus(201)
});
```

```
receiver.track({
  channelId,
  userId,
  event,
  properties,
});
```

## new Receiver (extends Emitter, implements CoreReceiver)
-- creates NodeEventFactory (extends EventFactory in core)
-- creates NodeEventQueue (extends CoreEventQueue extends Emitter, takes NodePriorityQueue extends PriorityQueue)
-- creates core plugin, registers it, then ready
-- has identify/track methods which pass through eventFactory and then are _dispatch

_dispatch -> dispatchEmit (calls @tronic/receiver-core/dispatch, but emits instead of promise)

@tronic/receiver-core/dispatch queue.dispatchSingle(ctx) or queue.dispatch(ctx)

queue.dispatchSingle(ctx) -> deliver -> flushOne

flushOne -> availableExtensions (before, enrichment), availableExtensions (destinations, after)

for each destination plugin, attempt the plugin[ctx.event.type]

in the case of the default plugin, identify / track = action

action -> normalizeEvent and publisher enqueue which batches and then sends the batch via http
