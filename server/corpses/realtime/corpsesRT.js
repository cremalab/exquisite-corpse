const lobbyRT = require('../../lobby/realtime/lobbyRT')
const urlPrefix = `/corpses`

const types = {
  CHANGE: 'corpseChange',
  COMPLETION: 'corpseCompletion',
  DRAWING_EXPIRATION: 'drawingExpiration',
}

module.exports = {
  registerSubscription(server) {
    server.subscription(`${urlPrefix}/{id}`)
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
    server.publish(`${urlPrefix}/${payload.corpse}`, {
      type: types.DRAWING_EXPIRATION,
      data: payload,
    })
  }
}
