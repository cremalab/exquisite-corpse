const common = require('../../../db/common')
const drawingsDB = require('../db/drawingsDB')

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
    drawingsDB.create(db, request.payload)
    .then((r) => {
      reply({ result: r })
    })
    .catch(err => reply(err))
  },
}
