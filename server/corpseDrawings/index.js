const corpseDrawingRoutes = require('./routes/corpseDrawingRoutes')

exports.register = (server, options, next) => {
  server.route(corpseDrawingRoutes)
  next()
}

exports.register.attributes = {
  name: 'corpseDrawings',
  dependencies: ['drawings', 'corpses', 'exquisiteAuth'],
}
