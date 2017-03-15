const handlers = require('../handlers')
const responses = require('../responses')
const schemas = require('../../../db/drawings/drawingSchemas')
const Joi = require('joi')

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/drawings/{id}',
      config: {
        handler: handlers.show,
        description: 'Returns a drawing',
        tags: ['api', 'drawing'],
        validate: {
          params: {
            id: Joi.string().required(),
          },
        },
        response: {
          schema: responses.single,
        },
      },
    },
    {
      method: 'POST',
      path: '/drawings',
      config: {
        handler: handlers.create,
        description: 'Creates a new drawing',
        tags: ['api', 'drawing'],
        validate: {
          payload: schemas.create,
        },
        response: {
          schema: responses.single,
        },
      },
    },
  ])

  next()
}

exports.register.attributes = {
  name: 'drawingRoutes',
}
