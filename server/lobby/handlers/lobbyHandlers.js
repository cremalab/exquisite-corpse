const corpsesDB = require('../../corpses/db/corpsesDB')
const lobbyRT = require('../realtime/lobbyRT')

module.exports = {
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
  createMessage(request, reply) {
    const { credentials } = request.auth
    lobbyRT.notifyChatMessage(request.server, credentials, request.payload.content)
    reply({ result: {
      content: request.payload.content,
      name: credentials.name,
      id: credentials.id,
      timestamp: new Date().toISOString(),
    } }).code(201)
  },
}
