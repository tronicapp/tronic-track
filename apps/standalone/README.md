## Tronic Receiver Vanilla JS Example

These pages provide examples of how to embed the Tronic Receiver onto a vanilla website using a Javascript loader snippet.

Minified:

````
<script>
  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","identify","reset","track","ready","debug"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.tronic.com/receiver.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="YOUR_WRITE_KEY";analytics.SNIPPET_VERSION="0.0.1";
  analytics.load("YOUR_WRITE_KEY");
  analytics.page();
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
      var analytics = (window.analytics = window.analytics || [])
      if (!analytics.initialize)
        if (analytics.invoked)
          window.console &&
            console.error &&
            console.error('Segment snippet included twice.')
        else {
          analytics.invoked = !0
          analytics.methods = [
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
          analytics.factory = function (e) {
            return function () {
              var t = Array.prototype.slice.call(arguments)
              t.unshift(e)
              analytics.push(t)
              return analytics
            }
          }
          for (var e = 0; e < analytics.methods.length; e++) {
            var key = analytics.methods[e]
            analytics[key] = analytics.factory(key)
          }
          analytics.load = function (key, e) {
            var t = document.createElement('script')
            t.type = 'text/javascript'
            t.async = !0
            t.src =
              'https://cdn.tronic.com/receiver.js/v1/' +
              writeKey +
              '/analytics.min.js'
            var n = document.getElementsByTagName('script')[0]
            n.parentNode.insertBefore(t, n)
            analytics._loadOptions = e
          }
          analytics.SNIPPET_VERSION = '0.0.1'
          analytics._writeKey = writeKey
          analytics.load()
        }
    })()
  }
</script>
````

To run:
```bash
yarn start
```
