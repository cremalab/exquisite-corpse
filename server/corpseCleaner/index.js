const CorpseCleaner = require('./CorpseCleaner')

const minute = 60000

exports.register = (server, options = {}, next) => {
  const cleaner = new CorpseCleaner(
    server.mongo.db, server, options.cleaner
  )
  const cleanerInt = setInterval(cleaner.clean.bind(cleaner), options.interval || 10 * minute)
  server.expose('cleaner', cleaner)
  server.expose('loop', cleanerInt)
  next()
}


exports.register.attributes = {
  name: 'corpseCleaner',
  dependencies: ['hapi-mongodb', 'corpses', 'drawings', 'lobby', 'nes'],
}
