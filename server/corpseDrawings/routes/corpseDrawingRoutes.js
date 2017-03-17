const handlers = require('../handlers')
const responses = require('../../corpses/responses')
const Joi = require('joi')

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'POST',
      path: '/corpses/{id}/drawings',
      config: {
        handler: handlers.create,
        description: 'Copies Drawing to Corpse Section',
        tags: ['api', 'drawing'],
        validate: {
          params: Joi.object().keys({
            id: Joi.string().required()
              .description('ObjectID of Corpse that Drawing should be added to'),
          }),
          payload: Joi.object().keys({
            drawing: Joi.string().required()
              .description('ObjectID of Drawing that should be added'),
            section: Joi.string().optional()
              .description(`ObjectID of the Section within the Corpse to add drawing to.
                Defaults to 'section' field of Drawing.
            `),
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
  name: 'corpseDrawingRoutes',
  dependencies: ['drawingRoutes', 'corpseRoutes', 'exquisiteAuth'],
}
