const corpseHandlers = require('../handlers/corpseHandlers')
const responses = require('../responses')
const Joi = require('joi')

exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/corpses',
    config: {
      handler: corpseHandlers.count,
      description: 'Returns all corpses',
      notes: ['They are all dead'],
      tags: ['api', 'corpse'],
      validate: {
      },
      response: {
        schema: responses.list,
      },
    },
  })

  next()
}

exports.register.attributes = {
  name: 'corpseRoutes',
}
