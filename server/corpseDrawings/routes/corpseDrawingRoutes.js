const handlers = require('../handlers')
const responses = require('../../corpses/responses')
const Joi = require('joi')

module.exports = [
  {
    method: 'POST',
    path: '/drawings/{id}/commit',
    config: {
      handler: handlers.create,
      description: 'Copies Drawing to its Corpse Section',
      notes: [`This should happen when a user is done with their drawing and ready to commit it.`],
      tags: ['api', 'drawing'],
      validate: {
        params: Joi.object().keys({
          id: Joi.string().required()
              .description('ObjectID of Drawing to commit'),
        }),
      },
      response: {
        schema: responses.single,
      },
    },
  },
]
