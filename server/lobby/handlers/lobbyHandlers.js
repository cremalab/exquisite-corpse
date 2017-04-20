const corpsesDB = require('../../corpses/db/corpsesDB')
const lobbyRT = require('../realtime/lobbyRT')

module.exports = {
  users(request, reply) {
    reply(lobbyRT.users)
  },
  connectUser(request, reply) {
    lobbyRT.connectUser(request.server, {credentials: request.auth.credentials})
    reply(request.auth.credentials)
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
    const creds = Object.assign({}, credentials, { status: 'idle' })
    lobbyRT.notifyChatMessage(request.server, creds, request.payload.content)
    lobbyRT.updateUser(request.server, creds)
    reply({ result: {
      content: request.payload.content,
      name: credentials.name,
      id: credentials.id,
      timestamp: new Date().toISOString(),
    } }).code(201)
  },
  changeStatus(request, reply) {
    let { credentials } = request.auth
    if (credentials.hasOwnProperty('credentials')) {
      credentials = credentials.credentials
    }
    const creds = Object.assign({}, credentials, {status: request.payload.status})
    lobbyRT.updateUser(request.server, creds)
    reply({ result: creds }).code(200)
  },
}
