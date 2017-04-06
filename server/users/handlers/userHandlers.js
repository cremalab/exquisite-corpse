const drawingsDB = require('../../drawings/db/drawingsDB')

module.exports = {
  drawings(request, reply) {
    const { db } = request.mongo
    return drawingsDB.getByUser(db, request.auth.credentials.id).then((drawings) => {
      reply({ result: drawings })
    })
  }
}
