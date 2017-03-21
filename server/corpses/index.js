const routes = require('./routes/corpseRoutes')
const rt = require('./realtime/corpsesRT')

exports.register = (server, options, next) => {
  server.route(routes)
  rt.registerSubscription(server)

  next()
}


exports.register.attributes = {
  name: 'corpses',
  dependencies: ['exquisiteAuth', 'nes'],
}
