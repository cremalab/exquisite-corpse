const corpsesDB = require('../db/corpsesDB')
const corpsesRT = require('../realtime/corpsesRT')
const lobbyRT = require('../../lobby/realtime/lobbyRT')
const eventTypes = require('../../lobby/realtime/eventTypes')
const Boom = require('boom')

function statusify(r) {
  return Object.assign({}, { status: 'new' }, r)
}

module.exports = {
  index(request, reply) {
    const { db } = request.mongo
    const perPage = request.query.perPage || 9
    const page = request.query.page || 1
    const skip = (request.query.page - 1 || 0) * perPage
    return corpsesDB.getAll(db, { sort: { createdAt: -1, status: -1 }, limit: perPage, skip })
      .then((r) => {
        const areMore = (r.total - skip) > perPage
        const areLess = skip > 0
        reply({ result: r.result, pagination: {
          page,
          next: areMore ? page + 1 : 0,
          previous: areLess ? page - 1 : 0,
          perPage
        }})
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
        const data = { credentials: user, corpse: r }
        lobbyRT.notifyEvent(request.server, eventTypes.CORPSE_CREATED, data)
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
  destroy(request, reply) {
    const { db } = request.mongo
    return corpsesDB.find(db, request.params.id).then((corpse) => {
      //if (corpse.creator.id !== request.auth.credentials.id) {
      //  throw Boom.create(403, `You did not create this corpse, you can't destroy it.`)
      //}
      return corpse
    })
    .then(() => (
      corpsesDB.destroy(db, request.params.id).then(() => {
        const result = {
          _id: request.params.id,
          removed: true,
        }
        corpsesRT.notifyChange(request.server, result)
        lobbyRT.notifyCorpseChange(request.server, result)
        reply({ result })
      })
    ))
    .catch((err) => reply(err))
  }
}
