const corpsesDB = require('../../corpses/db/corpsesDB')

function botCheck(request) {
  return request.headers['user-agent'].search(/bot/i) > -1 ||
         request.headers['user-agent'].search(/facebookexternalhit/i) > -1 || 1 === 1
}

module.exports = {
  corpseMeta(request, reply) {
    if ( botCheck(request) ) {
      const { db } = request.mongo
      corpsesDB.find(db, request.params.id).then((data) => {
        reply.view('index.html', {
          pageTitle: 'Corpse created by ' + data.creator.name,
          pageImage: {
            url: data.pngUrl,
            width: (data.size.width).toFixed(),
            height: (data.size.height).toFixed()
          }
        })
      })
    } else if ( !request.auth.isAuthenticated ) {
      reply.redirect('/')
    } else {
      reply.file('index.html')
    }
  }
}
