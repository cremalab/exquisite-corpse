const Joi = require('joi')
const handlers = require('../handlers/corpseHandlers')
const schemas = require('../db/corpseSchemas')
const responses = require('../responses')

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/corpses',
      config: {
        handler: handlers.index,
        description: 'Returns all corpses',
        tags: ['api', 'corpse'],
        response: {
          schema: responses.list,
        },
      },
    },
    {
      method: 'GET',
      path: '/corpses/{id}',
      config: {
        handler: handlers.show,
        description: 'Returns a corpse',
        tags: ['api', 'corpse'],
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
      path: '/corpses',
      config: {
        handler: handlers.create,
        description: 'Creates a new Corpse',
        notes: [`No params needed, default corpse generated and added to current user`],
        tags: ['api', 'corpse'],
        response: {
          schema: responses.single,
        },
      },
    },
    {
      method: 'PUT',
      path: '/corpses/{id}',
      config: {
        handler: handlers.update,
        description: 'Updates a Corpse',
        tags: ['api', 'corpse'],
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
  name: 'corpseRoutes',
  dependencies: ['exquisiteAuth'],
}
