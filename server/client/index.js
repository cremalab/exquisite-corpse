const clientRoutes = require('./routes/clientRoutes')
const Path = require('path')
const h2o2 = require('h2o2')
const registerTemplates = require('../utils/registerTemplates')

exports.register = (server, options, next) => {

  server.register({ register: h2o2 }, (err) => {
    if (err) { throw err }
    server.route(clientRoutes)
    server.views(registerTemplates(Path.join(__dirname, 'templates')))
    next()
  })
}

exports.register.attributes = {
  name: 'client',
  dependencies: ['exquisiteAuth'],
}
