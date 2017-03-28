const lobbyRoutes = require('./routes/lobbyRoutes')
const lobbyRt = require('./realtime/lobbyRT')
const Nunjucks = require('nunjucks')
const Path = require('path')

exports.register = (server, options, next) => {
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

  server.route(lobbyRoutes)
  lobbyRt.registerSubscription(server)

  next()
}

exports.register.attributes = {
  name: 'lobby',
  dependencies: ['exquisiteAuth', 'vision', 'corpses', 'nes'],
}
