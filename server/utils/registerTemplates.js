const Nunjucks = require('nunjucks')

module.exports = (path) => ({
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
  path: path,
})
