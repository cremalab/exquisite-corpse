const Bell = require('bell')

exports.register = (server, options, next) => {
  server.register(Bell, (err) => {
    server.auth.strategy('slack', 'bell', {
      provider: 'slack',
      password: process.env.COOKIE_PASSWORD || 'cookie_encryption_password_secure',
      isSecure: false,
      clientId: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET,
    })
    next()
  })
}

exports.register.attributes = {
  name: 'exquisiteAuth',
  dependencies: ['bell'],
}
