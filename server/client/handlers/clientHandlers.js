const corpsesDB = require('../../corpses/db/corpsesDB')
const R = require('ramda')

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
        const drawerNames = R.filter(
          R.compose(R.not, R.isNil),
          R.map(R.compose(R.prop('name'), R.prop('drawer')), data.sections)
        )
        reply.view('index.html', {
          creator: R.join(', ', drawerNames),
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
