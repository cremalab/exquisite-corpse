const handlers = require('../handlers')
const responses = require('../responses')
const Joi = require('joi')

exports.register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/sessions',
    config: {
      handler: handlers.index,
      description: 'Returns all sessions',
      tags: ['api', 'session'],
      validate: {},
      response: {
        schema: responses.list,
      },
    },
  })

  next()
}

exports.register.attributes = {
  name: 'sessionRoutes',
}
