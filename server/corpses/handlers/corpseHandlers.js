const corpsesDB = require('../db/corpsesDB')

module.exports = {
  show(request, reply) {
    const { db } = request.mongo
    return corpsesDB.find(db, request.params.id).then((r) => {
      reply({ result: r })
    })
    .catch(err => reply(err))
  },
  create(request, reply) {
    const { db } = request.mongo
    corpsesDB.create(db, request.payload)
    .then((r) => {
      reply({ result: r })
    })
    .catch(err => reply(err))
  },
  update(request, reply) {
    const { db } = request.mongo
    corpsesDB.update(db, request.params.id, request.payload)
    .then((r) => {
      reply({ result: r })
    })
    .catch(err => reply(err))
  },
}
