const corpsesDB = require('../../corpses/db/corpsesDB')

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
    handler: (request, reply) => {
      reply.view('index.html', {  })
    }
  },
  {
    method: 'GET',
    path: '/corpse/{id}',
    handler: function (request, reply) {
      const { db } = request.mongo
      corpsesDB.find(db, request.params.id).then((data) => {
        reply.view('index.html', {
          pageTitle: 'Corpse created by ' + data.creator.name,
          pageImage: data.svgUrl,
        })
      })

    }
  }
]
