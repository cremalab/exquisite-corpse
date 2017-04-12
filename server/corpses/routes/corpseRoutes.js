const Joi = require('joi')
const handlers = require('../handlers/corpseHandlers')
const schemas = require('../db/corpseSchemas')
const responses = require('../responses')

module.exports = [
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
      notes: [
        `Default corpse generated if no sections are passed`,
        '`anchorPoints`: Array of X Coordinates for the **bottom** guides of each section. If defined, the `anchorPoints` for the last section will be ignored.',
      ],
      tags: ['api', 'corpse'],
      validate: {
        payload: schemas.createFromRequest.optional().allow(null),
      },
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
      notes: ['Publishes a socket event to `/corpses/_id` on successful update'],
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
]
