const drawingsDB = require('../../drawings/db/drawingsDB')

module.exports = {
  drawings(request, reply) {
    console.log(request.auth.credentials.id);
    return drawingsDB.getByUser(request.auth.credentials.id).then((drawings) => {
      reply({ result: drawings })
    })
  }
}
