const handlers = require('../handlers')
const responses = require('../responses')
const schemas = require('../../drawings/db/drawingSchemas')
const Joi = require('joi')

module.exports = [
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
      notes: ['If no `section` attribute is passed in the payload, the drawing will\
        be created for the oldest corpse section needing a drawing'],
      tags: ['api', 'drawing'],
      validate: {
        payload: schemas.createPayload.required(),
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
  {
    method: 'DELETE',
    path: '/drawings/{id}',
    config: {
      handler: handlers.destroy,
      description: 'Deletes a drawing, removes it from the corpse',
      tags: ['api', 'drawing', 'corpse'],
      validate: {
        params: Joi.object().keys({
          id: Joi.string().required(),
        }),
      },
    },
  },
]
