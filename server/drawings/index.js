const drawingRoutes = require('./routes/drawingRoutes')

exports.register = (server, options, next) => {
  server.route(drawingRoutes)

  next()
}

exports.register.attributes = {
  name: 'drawings',
  dependencies: ['exquisiteAuth'],
}
