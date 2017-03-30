const Joi = require('joi')
const handlers = require('../handlers')
const responses = require('./responses')

module.exports = [
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
  {
    method: 'DELETE',
    path: '/lobby',
    config: {
      handler: handlers.disconnectUser,
      description: 'Removes the current user from the lobby',
      notes: ['Can be requested over HTTP or sockets'],
      tags: ['api', 'realtime', 'lobby'],
    },
  },
  {
    method: 'POST',
    path: '/lobby/chat',
    config: {
      handler: handlers.createMessage,
      description: 'Transmits a chat message. Not persisted anywhere',
      notes: ['Can be requested over HTTP or sockets'],
      tags: ['api', 'realtime', 'lobby'],
      validate: {
        payload: Joi.object().keys({
          content: Joi.string().required().example('I love to chat')
        }),
      },
      response: {
        schema: responses.chatMessage,
      },
    },
  },
]
