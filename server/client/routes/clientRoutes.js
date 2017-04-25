const corpsesDB = require('../../corpses/db/corpsesDB')
const Joi = require('joi')

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
      auth: false,
    },
    handler: function (request, reply) {
      if (
        request.headers['user-agent'].search(/bot/i) > -1 ||
        request.headers['user-agent'].search(/facebookexternalhit/i) > -1
      ) {
        const { db } = request.mongo
        corpsesDB.find(db, request.params.id).then((data) => {
          reply.view('index.html', {
            pageTitle: 'Corpse created by ' + data.creator.name,
            pageImage: data.pngUrl,
          })
        })
      } else if ( !request.auth.isAuthenticated ) {
        reply.redirect('/')
      } else {
        reply.file('index.html')
      }
    }
  }
]
