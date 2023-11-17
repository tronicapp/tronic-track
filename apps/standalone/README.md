## Tronic Receiver Vanilla JS Example

These pages provide examples of how to embed the Tronic Receiver onto a vanilla website using a Javascript loader snippet.

Minified:

````
<script>
  !function(){var receiver=window.receiver=window.receiver||[];if(!receiver.initialize)if(receiver.invoked)window.console&&console.error&&console.error("Tronic snippet included twice.");else{receiver.invoked=!0;receiver.methods=["trackSubmit","trackClick","trackLink","trackForm","identify","reset","track","ready","debug"];receiver.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);receiver.push(t);return receiver}};for(var e=0;e<receiver.methods.length;e++){var key=receiver.methods[e];receiver[key]=receiver.factory(key)}receiver.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.tronic.com/receiver.js/v1/" + key + "/receiver.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);receiver._loadOptions=e};receiver._writeKey="YOUR_WRITE_KEY";receiver.SNIPPET_VERSION="0.0.1";
  receiver.load("YOUR_WRITE_KEY");
  receiver.page();
  }}();
</script>
````
Unminified:

````
<script>
  const { searchParams } = new URL(document.location);
  const writeKey = searchParams.get("writeKey");
  document.querySelector("input").value = writeKey;

  if (writeKey) {
    !(function () {
      var receiver = (window.receiver = window.receiver || [])
      if (!receiver.initialize)
        if (receiver.invoked)
          window.console &&
            console.error &&
            console.error('Tronic snippet included twice.')
        else {
          receiver.invoked = !0
          receiver.methods = [
            'screen',
            'register',
            'deregister',
            'trackSubmit',
            'trackClick',
            'trackLink',
            'trackForm',
            'identify',
            'reset',
            'track',
            'ready',
            'debug',
          ]
          receiver.factory = function (e) {
            return function () {
              var t = Array.prototype.slice.call(arguments)
              t.unshift(e)
              receiver.push(t)
              return receiver
            }
          }
          for (var e = 0; e < receiver.methods.length; e++) {
            var key = receiver.methods[e]
            receiver[key] = receiver.factory(key)
          }
          receiver.load = function (key, e) {
            var t = document.createElement('script')
            t.type = 'text/javascript'
            t.async = !0
            t.src =
              'https://cdn.tronic.com/receiver.js/v1/' +
              writeKey +
              '/receiver.min.js'
            var n = document.getElementsByTagName('script')[0]
            n.parentNode.insertBefore(t, n)
            receiver._loadOptions = e
          }
          receiver.SNIPPET_VERSION = '0.0.1'
          receiver._writeKey = writeKey
          receiver.load()
        }
    })()
  }
</script>
````

To run:
```bash
yarn start
```
