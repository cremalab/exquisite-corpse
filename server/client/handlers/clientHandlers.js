const corpsesDB = require('../../corpses/db/corpsesDB')

function botCheck(request) {
  return request.headers['user-agent'].search(/bot/i) > -1 ||
         request.headers['user-agent'].search(/facebookexternalhit/i) > -1
}

module.exports = {
  corpseMeta(request, reply) {
    if ( botCheck(request) ) {
      const { db } = request.mongo
      const pageUrl = request.connection.info.protocol + '://' +
            request.headers.host +
            request.url.path

      corpsesDB.find(db, request.params.id).then((data) => {
        reply.view('index.html', {
          creator: data.creator.name,
          pageUrl: pageUrl,
          pageImage: {
            url: data.pngUrl,
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
