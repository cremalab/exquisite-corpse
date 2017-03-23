# Lobby

## View
The root URL of the application will hit the lobby's index endpoint and render a nunjucks view

## HTTP API
See [Swagger docs](http://localhost:8000/documentation#/lobby) for API operations. Requests can also be made over sockets with
```js
// after connected to socket server (see below)...
client.request({
    path: '/lobby',
    method: 'POST',
  }, (err, payload) => {
    if (err) { console.log(err) }
    console.log(payload)
  })
})
```

## Realtime API
To subscribe to the lobby, first create a connection with the socket server:

```js
import Nes from 'nes'

const host = location.origin.replace(/^http/, 'ws') // ws://localhost:8000
const wsClient = new Nes.Client('ws://localhost')

wsClient.connect((err) => {
  if (err) { return console.log(err) }
  console.log('You are connected!')
})
```

Then subscribe to the lobby:

```js
function handleLobbyMsg(message, flags) {
  const { type, data } = message
  // type is a string describing the action that happened
  // data is an object with the good stuff
}

wsClient.subscribe('/lobby', handleLobbyMsg, handleErr)
```

### Message Types
* `usersChange`: a user has joined or left the lobby. Payload is an array of users currently in the lobby
* `corpseChange`: a Corpse has been updated. Payload is the entire serialized Corpse.
