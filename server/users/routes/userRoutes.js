const drawingResponses = require('../../drawings/responses')
const handlers = require('../handlers/userHandlers')
const Joi = require('joi')

module.exports = [
  {
    method: 'GET',
    path: '/me/drawings',
    config: {
      handler: handlers.drawings,
      description: 'Returns drawings by current user',
      tags: ['api', 'users', 'drawings'],
      validate: {
        query: Joi.object().keys({
          status: Joi.string().valid(['incomplete', 'complete']).optional()
        })
      },
      response: {
        schema: drawingResponses.list,
      },
    }
  }
]
