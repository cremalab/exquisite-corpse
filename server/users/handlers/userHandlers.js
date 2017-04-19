const drawingsDB = require('../../drawings/db/drawingsDB')

module.exports = {
  drawings(request, reply) {
    const { db } = request.mongo
    const { status } = request.query
    return drawingsDB.getByUser(db, request.auth.credentials.id, status).then((drawings) => {
      reply({ result: drawings })
    })
  }
}
