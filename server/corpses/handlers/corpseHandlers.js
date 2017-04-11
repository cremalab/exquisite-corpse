const corpsesDB = require('../db/corpsesDB')
const corpsesRT = require('../realtime/corpsesRT')
const lobbyRT = require('../../lobby/realtime/lobbyRT')

function statusify(r) {
  return Object.assign({}, { status: 'new' }, r)
}

module.exports = {
  index(request, reply) {
    const { db } = request.mongo
    return corpsesDB.getAll(db, { sort: { createdAt: -1 }})
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
    const user = request.auth.credentials
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
    const updates = Object.assign({}, request.payload, { status: 'incomplete' })
    corpsesDB.update(db, request.params.id, updates)
      .then((r) => {
        corpsesRT.notifyChange(request.server, r)
        lobbyRT.notifyCorpseChange(request.server, r)
        reply({ result: statusify(r) })
      })
      .catch(err => reply(err))
  },
}
