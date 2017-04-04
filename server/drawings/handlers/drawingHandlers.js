const common = require('../../../db/common')
const drawingsDB = require('../db/drawingsDB')
const corpseSectionsDB = require('../../corpseSections/db/corpseSectionsDB')
const corpseRT = require('../../corpses/realtime/corpsesRT')
const lobbyRT = require('../../lobby/realtime/lobbyRT')
const Boom = require('boom')

module.exports = {
  show(request, reply) {
    const { db } = request.mongo
    common.find(db, request.params.id, 'drawings').then((r) => {
      if (request.auth.credentials.id !== r.creator.id) {
        return reply(Boom.create(404, `Drawing by the current user with that ID cannot be found.`))
      }
      return reply({ result: r })
    })
    .catch(err => reply(err))
  },
  create(request, reply) {
    const { db } = request.mongo
    const { credentials } = request.auth
    const attrs = Object.assign({}, request.payload, { creator: credentials })
    drawingsDB.create(db, attrs)
    .then((r) => {
      corpseSectionsDB.addDrawingId(db, r.section, r._id, true)
      .then((corpse) => {
        corpseRT.notifyChange(request.server, corpse)
        lobbyRT.notifyCorpseChange(request.server, corpse)
      }).catch(err => console.log(err))

      reply({ result: r }).code(201)
    })
    .catch(err => reply(Boom.wrap(err)))
  },
  update(request, reply) {
    const { db } = request.mongo
    drawingsDB.update(db, request.params.id, request.payload)
    .then((r) => {
      reply({ result: r })
    })
    .catch(err => reply(err))
  },
}
