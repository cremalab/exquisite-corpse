function clientHandler() {
  let handler
  // Production
  handler = {
    file: 'index.html',
  }

  // Dev
  if (process.env.NODE_ENV !== 'production') {
    handler = {
      proxy: {
        host: 'localhost',
        port: '3000',
        protocol: 'http',
      },
    }
  }
  return handler
}

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: clientHandler(),
  },
  {
    method: 'GET',
    path: '/static/{p*}',
    handler: clientHandler(),
    config: {
      auth: false,
    },
  },
  {
    method: '*',
    path: '/sockjs-node/{p*}',
    handler: clientHandler(),
    config: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/{p*}',
    handler: clientHandler(),
  },
]
