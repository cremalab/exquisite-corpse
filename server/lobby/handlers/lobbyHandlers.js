const corpsesDB = require('../../corpses/db/corpsesDB')
const lobbyRT = require('../realtime/lobbyRT')

module.exports = {
  index(request, reply) {
    const { db } = request.mongo
    return corpsesDB.getAll(db).then(list => (
      reply.view('index', {
        credentials: request.auth.credentials.profile,
        corpses: list,
      })
    )).catch(reply)
  },
  users(request, reply) {
    reply(lobbyRT.users)
  },
  connectUser(request, reply) {
    lobbyRT.connectUser(request.server, request.auth.credentials)
    reply(lobbyRT.users)
  },
  disconnectUser(request, reply) {
    lobbyRT.disconnectUser(request.server, request.auth.credentials)
    reply(lobbyRT.users)
  },
  lobby(request, reply) {
    const { db } = request.mongo
    return corpsesDB.getAll(db).then(list => (
      reply({
        users: lobbyRT.users,
        corpses: list,
      })
    )).catch(reply)
  },
}
