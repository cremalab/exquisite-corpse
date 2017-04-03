module.exports = [
  {
    method: 'GET',
    path: '/login',
    config: {
      auth: 'slack',
      handler(request, reply) {
        if (request.auth.isAuthenticated) {
          request.cookieAuth.set(request.auth.credentials)
          return reply.redirect('/')
        }
        return reply('Not logged in...').code(401)
      },
      tags: ['auth'],
    },
  },
  {
    method: 'GET',
    path: '/logout',
    config: {
      auth: false,
      handler(request, reply) {
        request.cookieAuth.clear()
        return reply.redirect('/')
      },
      tags: ['api', 'auth'],
    },
  },
  {
    method: 'GET',
    path: '/me',
    config: {
      handler(request, reply) {
        return reply({ result: request.auth.credentials.profile.raw })
      },
      tags: ['api', 'auth'],
    },
  },
]
