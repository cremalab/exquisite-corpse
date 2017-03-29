# Lobby

## View
The root URL of the application will hit the lobby's index endpoint and render a nunjucks view

## HTTP API
See [Swagger docs](http://localhost:8000/documentation#/lobby) for API operations. Requests can also be made over sockets with
```js
// after connected to socket server (see below)...
wsClient.request({
    path: '/lobby',
    method: 'POST',
  }, (err, payload) => {
    if (err) { console.log(err) }
    console.log(payload)
  }
)
```

## Realtime API
To subscribe to the lobby, first create a connection with the socket server:

```js
import Nes from 'nes'

const wsClient = new Nes.Client('ws://localhost:8000')

function handleLobbyMsg(msg) {
  console.log(msg);
}
// Fetch to get a Websocket token...
fetch('/nes/auth', { credentials: 'include' })
  .then(res => res.json())
  .then((res) => {
    // then connect to the server with the token as the auth option
    wsClient.connect({ auth: res.token }, err => {
      if (err) { return console.log(err) }
      wsClient.subscribe('/lobby', handleLobbyMsg, (err) => console.log(err))
    })
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
* `chatMessage`: a payload with `user`, `user_id`, and `content` keys describing a message that was sent via chat. Messages are not persisted on the server.
