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
    handler: function (request, reply) {
      //const { db } = request.mongo
      //var data = { message: 'Hello from Future Studio' }
      //corpsesDB.find(request.db, request.params.id).then((data) => {
        //reply.view('index.html', data)
      //})
      reply.view('index.html')
    }
  }
]
