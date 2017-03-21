const urlPrefix = `/corpses`

module.exports = {
  registerSubscription(server) {
    server.subscription(`${urlPrefix}/{id}`)
  },
  notifyChange(server, payload) {
    server.publish(`${urlPrefix}/${payload._id}`, payload)
  },
}
