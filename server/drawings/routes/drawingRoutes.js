const handlers = require('../handlers')
const responses = require('../responses')
const schemas = require('../../drawings/db/drawingSchemas')
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
          payload: schemas.create.required(),
        },
        response: {
          schema: responses.single,
        },
      },
    },
    {
      method: 'PUT',
      path: '/drawings/{id}',
      config: {
        handler: handlers.update,
        description: 'Updates a drawing',
        notes: ['Ignores everything but canvas changes'],
        tags: ['api', 'drawing'],
        validate: {
          payload: schemas.update.required(),
          params: Joi.object().keys({
            id: Joi.string().required(),
          }),
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
