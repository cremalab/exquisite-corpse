const Joi = require('joi')
const handlers = require('../handlers/clientHandlers')

module.exports = [
  {
    method: 'GET',
    path: '/public/{p*}',
    handler: {
      directory: {
        path: '.',
      },
    },
    config: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/{p*}',
    handler: { file: 'index.html' },
  },
  {
    method: 'GET',
    path: '/corpse/{id}',
    config: {
      auth: {
        strategies: ['userCookie'],
        mode: 'try',
      },
    },
    handler: handlers.corpseMeta
  }
]
