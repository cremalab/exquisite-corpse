const Bell = require('bell')
const AuthCookie = require('hapi-auth-cookie')

exports.register = (server, options, next) => {
  server.register([Bell, AuthCookie], (err) => {
    if (err) {
      console.error(err)
      return process.exit(1)
    }

    const authCookieOptions = {
      password: process.env.COOKIE_PASSWORD || 'cookie-super-secret-encryption-password-wow',
      cookie: 'exquisite-auth',
      isSecure: false,
      redirectTo: '/login',
      clearInvalid: true,
    }

    server.auth.strategy('userCookie', 'cookie', authCookieOptions)

    server.auth.strategy('slack', 'bell', {
      provider: 'slack',
      password: process.env.COOKIE_PASSWORD || 'cookie_encryption_password_secure',
      isSecure: false,
      location: 'http://localhost:8000',
      clientId: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET,
    })

    server.auth.default('userCookie')

    server.route({
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
      },
    })

    server.route({
      method: 'GET',
      path: '/logout',
      config: {
        auth: false,
        handler(request, reply) {
          request.cookieAuth.clear()
          return reply.redirect('/')
        },
      },
    })

    next()
  })
}

exports.register.attributes = {
  name: 'exquisiteAuth',
  dependencies: ['bell'],
}
