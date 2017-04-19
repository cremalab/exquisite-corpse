const CorpseCleaner = require('./CorpseCleaner')

const hour = 3600000

exports.register = (server, options, next) => {
  const cleaner = new CorpseCleaner(server.mongodb)
  const cleanerInt = setInterval(cleaner.clean, options.interval || hour * 2)
  server.expose('cleaner', cleaner)
  server.expose('loop', cleanerInt)
  next()
}


exports.register.attributes = {
  name: 'corpseCleaner',
  dependencies: ['hapi-mongodb', 'corpses', 'drawings', 'lobby', 'nes'],
}
