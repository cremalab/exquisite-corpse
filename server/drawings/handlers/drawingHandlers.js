const common = require('../../../db/common')
const drawingsDB = require('../db/drawingsDB')
const corpseSectionsDB = require('../../corpseSections/db/corpseSectionsDB')
const corpsesDB = require('../../corpses/db/corpsesDB')
const corpseRT = require('../../corpses/realtime/corpsesRT')
const lobbyRT = require('../../lobby/realtime/lobbyRT')
const eventTypes = require('../../lobby/realtime/eventTypes')
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
        const data = { corpse, credentials, section: r.section, drawing: r._id }
        lobbyRT.notifyEvent(request.server, eventTypes.DRAWING_STARTED, data)
      }).catch(err => { throw err })

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
  destroy(request, reply) {
    const { db } = request.mongo
    return drawingsDB.destroy(db, request.params.id, true).then((res) => {
      corpsesDB.findBySection(db, res).then((corpse) => {
        lobbyRT.notifyCorpseChange(request.server, corpse)
        corpseRT.notifyChange(request.server, corpse)
      })
      reply({ result: { message: 'It is no more!' }})
    })
    .catch(err => reply(Boom.wrap(err)))
  }
}
