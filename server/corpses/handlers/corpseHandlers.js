const corpsesDB = require('../db/corpsesDB')
const corpsesRT = require('../realtime/corpsesRT')
const lobbyRT = require('../../lobby/realtime/lobbyRT')

module.exports = {
  index(request, reply) {
    const { db } = request.mongo
    return corpsesDB.getAll(db)
      .then((r) => {
        reply({ result: r })
      })
      .catch(err => reply(err))
  },
  show(request, reply) {
    const { db } = request.mongo
    return corpsesDB.find(db, request.params.id)
      .then((r) => {
        reply({ result: r })
      })
      .catch(err => reply(err))
  },
  create(request, reply) {
    const { db } = request.mongo
    const user = request.auth.credentials.profile
    const attrs = Object.assign({}, request.payload, { creator: user })
    corpsesDB.create(db, attrs)
      .then((r) => {
        lobbyRT.notifyCorpseChange(request.server, r)
        reply({ result: r }).code(201)
      })
      .catch(err => reply(err))
  },
  update(request, reply) {
    const { db } = request.mongo
    corpsesDB.update(db, request.params.id, request.payload)
      .then((r) => {
        corpsesRT.notifyChange(request.server, r)
        lobbyRT.notifyCorpseChange(request.server, r)
        reply({ result: r })
      })
      .catch(err => reply(err))
  },
}
