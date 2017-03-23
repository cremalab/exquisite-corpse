const handlers = require('../handlers')
const responses = require('./responses')

module.exports = [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: handlers.index,
      description: 'The lobby!',
      tags: ['lobby'],
    },
  },
  {
    method: 'GET',
    path: '/lobby',
    config: {
      handler: handlers.lobby,
      description: 'Returns object with users currently in lobby and corpses',
      tags: ['api', 'realtime', 'lobby'],
      response: {
        schema: responses.lobby,
      },
    },
  },
  {
    method: 'POST',
    path: '/lobby',
    config: {
      handler: handlers.connectUser,
      description: 'Adds the current user to the lobby',
      notes: ['Can be requested over HTTP or sockets'],
      tags: ['api', 'realtime', 'lobby'],
    },
  },
]
