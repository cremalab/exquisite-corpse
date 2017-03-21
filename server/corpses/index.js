const routes = require('./routes/corpseRoutes')

exports.register = (server, options, next) => {
  server.route(routes)

  next()
}


exports.register.attributes = {
  name: 'corpses',
  dependencies: ['exquisiteAuth'],
}
