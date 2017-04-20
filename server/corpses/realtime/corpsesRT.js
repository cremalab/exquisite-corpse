const lobbyRT = require('../../lobby/realtime/lobbyRT')
const urlPrefix = `/corpses`

const types = {
  CHANGE: 'corpseChange',
  COMPLETION: 'corpseCompletion',
  DRAWING_EXPIRATION: 'drawingExpiration',
}

module.exports = {
  registerSubscription(server) {
    server.subscription(`${urlPrefix}/{id}`, {
      onUnsubscribe(socket, path, params, next) {
        lobbyRT.updateUser(
          server,
          Object.assign({}, socket.auth.credentials.credentials, { status: 'idle'}),
          socket.id
        )
        next()
      },
      onSubscribe(socket, path, params, next) {
        lobbyRT.updateUser(
          server,
          Object.assign({}, socket.auth.credentials.credentials, { status: 'drawing'}),
          socket.id
        )
        next()
      }
    })
  },
  notifyChange(server, payload) {
    server.publish(`${urlPrefix}/${payload._id}`, {
      type: types.CHANGE,
      data: payload,
    })
  },
  notifyCompletion(server, payload) {
    server.publish(`${urlPrefix}/${payload._id}`, {
      type: types.COMPLETION,
      data: payload,
    })
  },
  notifyDrawingExpiration(server, payload) {
    console.log('corpseRT#drawingExpiration!');
    console.log(payload);
    console.log(types.DRAWING_EXPIRATION);
    console.log(`${urlPrefix}/${payload.corpse}`);
    server.publish(`${urlPrefix}/${payload.corpse}`, {
      type: types.DRAWING_EXPIRATION,
      data: payload,
    })
  }
}
