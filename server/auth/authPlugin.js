const Bell = require('bell')
const Nunjucks = require('nunjucks')
const Path = require('path')
const AuthCookie = require('hapi-auth-cookie')
const authRoutes = require('./routes/authRoutes')

exports.register = (server, options, next) => {
  server.register([Bell, AuthCookie], (err) => {
    if (err) {
      console.error(err)
      return process.exit(1)
    }

    server.views({
      engines: {
        html: {
          compile(src, opts) {
            const template = Nunjucks.compile(src, opts.environment)

            return context => template.render(context)
          },

          prepare(opts, n) {
            opts.compileOptions.environment = Nunjucks.configure(opts.path, { watch: false })
            return n()
          },
        },
      },
      path: Path.join(__dirname, 'templates'),
    })

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
