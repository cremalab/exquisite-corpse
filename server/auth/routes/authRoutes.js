const providers = require('../lib/authProviders')

const enabledProviders = [
  // {name: 'Slack', route: '/login/slack' },
  // {name: 'Instagram', route: '/login/instagram' },
  {name: 'Facebook', route: '/login/facebook' },
  {name: 'Google', route: '/login/google' },
  {name: 'Github', route: '/login/github' },
]

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
        return reply.view('index', { enabledProviders })
      },
      tags: ['auth'],
    },
  },
  //FIRST FRIDAY, REMOVE
  /*
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
      tags: ['auth', 'bell'],
    },
  },
  {
    method: 'GET',
    path: '/login/github',
    config: {
      auth: 'github',
      description: 'Login with Github',
      handler(request, reply) {
        if (request.auth.isAuthenticated) {
          request.cookieAuth.set(providers.standardizeProfile(request.auth.credentials))
          return reply.redirect('/')
        }
        return reply.view('index')
      },
      tags: ['auth', 'bell'],
    },
  },
  {
    method: 'GET',
    path: '/login/facebook',
    config: {
      auth: 'facebook',
      description: 'Login with Facebook',
      handler(request, reply) {
        if (request.auth.isAuthenticated) {
          request.cookieAuth.set(providers.standardizeProfile(request.auth.credentials))
          return reply.redirect('/')
        }
        return reply.view('index')
      },
      tags: ['auth', 'bell'],
    },
  },
  {
    method: 'GET',
    path: '/login/google',
    config: {
      auth: 'google',
      description: 'Login with Google',
      handler(request, reply) {
        if (request.auth.isAuthenticated) {
          request.cookieAuth.set(providers.standardizeProfile(request.auth.credentials))
          return reply.redirect('/')
        }
        return reply.view('index')
      },
      tags: ['auth', 'bell'],
    },
  },*/
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
