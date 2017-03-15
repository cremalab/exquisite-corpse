const corpseHandlers = require('../handlers/corpseHandlers')
const responses = require('../responses')

exports.register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/corpses',
    config: {
      handler: corpseHandlers.index,
      description: 'Returns all corpses',
      notes: ['They are all dead'],
      tags: ['api', 'corpse'],
      validate: {
      },
      response: {
        schema: responses.list,
      },
    },
  })

  next()
}

exports.register.attributes = {
  name: 'corpseRoutes',
}
