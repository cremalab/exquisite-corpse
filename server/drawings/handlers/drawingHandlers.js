const common = require('../../../db/common')
const drawingsDB = require('../db/drawingsDB')
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
    const attrs = Object.assign({}, request.payload, { creator: 'currentUser' })
    drawingsDB.create(db, attrs)
    .then((r) => {
      reply({ result: r })
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
