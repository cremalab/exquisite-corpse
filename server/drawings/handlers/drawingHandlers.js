const common = require('../../../db/common')
const drawingsDB = require('../db/drawingsDB')
const corpsesDB = require('../../corpses/db/corpsesDB')
const corpseRT = require('../../corpses/realtime/corpsesRT')
const Boom = require('boom')

module.exports = {
  show(request, reply) {
    const { db } = request.mongo
    common.find(db, request.params.id, 'drawings').then((r) => {
      reply({ result: r })
    })
    .catch(err => reply(err))
  },
  create(request, reply) {
    const { db } = request.mongo
    const { credentials } = request.auth
    const attrs = Object.assign({}, request.payload, { creator: credentials })
    drawingsDB.create(db, attrs)
    .then((r) => {
      corpsesDB.findBySection(db, r.section).then((corpse) => {
        corpseRT.notifyChange(request.server, corpse)
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
