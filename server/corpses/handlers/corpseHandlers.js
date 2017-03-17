const corpsesDB = require('../db/corpsesDB')

module.exports = {
  index(request, reply) {
    const { db } = request.mongo
    return corpsesDB.getAll(db).then((r) => {
      console.log(r);
      reply({ result: r })
    })
    .catch(err => reply(err))
  },
  show(request, reply) {
    const { db } = request.mongo
    return corpsesDB.find(db, request.params.id).then((r) => {
      reply({ result: r })
    })
    .catch(err => reply(err))
  },
  create(request, reply) {
    const { db } = request.mongo
    const attrs = Object.assign({}, request.payload, { creator: 'currentUser' })
    corpsesDB.create(db, attrs)
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
