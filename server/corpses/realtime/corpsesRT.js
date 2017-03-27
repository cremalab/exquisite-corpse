const urlPrefix = `/corpses`

const types = {
  CHANGE: 'change',
  COMPLETION: 'completion',
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
}
