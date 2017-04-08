const drawingResponses = require('../../drawings/responses')
const handlers = require('../handlers/userHandlers')

module.exports = [
  {
    method: 'GET',
    path: '/me/drawings',
    config: {
      handler: handlers.drawings,
      description: 'Returns drawings by current user',
      tags: ['api', 'users', 'drawings'],
      response: {
        schema: drawingResponses.list,
      },
    }
  }
]
