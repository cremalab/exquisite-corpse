# Lobby

## HTTP API
See [Swagger docs](http://localhost:8000/documentation#/corpses) for API operations. Requests can also be made over sockets with
```js
// after connected to socket server (see below)...
client.request({
    path: '/corpse',
    method: 'POST',
  }, (err, payload) => {
    if (err) { console.log(err) }
    console.log(payload)
  })
})
```

## Realtime API
To subscribe to an individual corpse endpoint, first create a connection with the socket server (see [lobby README](https://github.com/cremalab/exquisite-corpse/blob/master/server/lobby/README.md#realtime-api))

Then subscribe to the corpse by its ID:

```js
function handleCorpseMsg(message, flags) {
  const { type, data } = message
  // type is a string describing the action that happened
  // data is an object with the good stuff
}

wsClient.subscribe(`/corpse/${corpseID}`, handleCorpseMsg, handleErr)
```

### Message Types
* `corpseChange`: the Corpse has been updated. Could mean a drawer was added, a drawing was completed, or anything else
* `corpseCompletion`: a Corpse has all of its drawings completed. Use this event to trigger a reveal.

**TODO**: final corpse canvas is not merged/created on the server, so it will need to be done client-side. Eventually I want to generate the canvas on the server and send one payload to import on the client.
