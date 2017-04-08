const userRoutes = require('./routes/userRoutes')

exports.register = (server, options, next) => {
  server.route(userRoutes)

  next()
}

exports.register.attributes = {
  name: 'users',
  dependencies: ['exquisiteAuth', 'corpses', 'drawings'],
}
