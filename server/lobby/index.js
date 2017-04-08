const lobbyRoutes = require('./routes/lobbyRoutes')
const lobbyRt = require('./realtime/lobbyRT')

exports.register = (server, options, next) => {
  server.route(lobbyRoutes)
  lobbyRt.registerSubscription(server)

  next()
}

exports.register.attributes = {
  name: 'lobby',
  dependencies: ['exquisiteAuth', 'vision', 'corpses', 'nes'],
}
