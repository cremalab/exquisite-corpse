const Bell = require('bell')
const AuthCookie = require('hapi-auth-cookie')
const authRoutes = require('./routes/authRoutes')

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
      location: `${process.env.PUBLIC_URL}`,
      clientId: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET,
    })

    server.auth.default('userCookie')

    server.route(authRoutes)

    return next()
  })
}

exports.register.attributes = {
  name: 'exquisiteAuth',
  dependencies: ['bell'],
}
