const providers = require('../lib/authProviders')

module.exports = [
  {
    method: 'GET',
    path: '/login',
    config: {
      auth: false,
      handler(request, reply) {
        if (request.auth.isAuthenticated) {
          request.cookieAuth.set(providers.standardizeProfile(request.auth.credentials))
          return reply.redirect('/')
        }
        return reply.view('index')
      },
      tags: ['auth'],
    },
  },
  {
    method: 'GET',
    path: '/login/slack',
    config: {
      auth: 'slack',
      description: 'Login with Slack',
      handler(request, reply) {
        if (request.auth.isAuthenticated) {
          request.cookieAuth.set(providers.standardizeProfile(request.auth.credentials))
          return reply.redirect('/')
        }
        return reply.view('index')
      },
      tags: ['auth'],
    },
  },
  {
    method: 'POST',
    path: '/login/guest',
    config: {
      auth: false,
      description: 'Login as a guest',
      handler(request, reply) {
        const creds = {
          provider: 'guest',
          name: request.payload.name,
        }
        console.log(creds);
        if (!request.auth.isAuthenticated) {
          request.cookieAuth.set(providers.standardizeProfile(creds))
        }
        return reply.redirect('/')
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
        return reply({ result: request.auth.credentials })
      },
      tags: ['api', 'auth'],
    },
  },
]
