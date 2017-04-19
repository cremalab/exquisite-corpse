const corpseRT = require('../corpses/realtime/corpsesRT')
const lobbyRT = require('../lobby/realtime/lobbyRT')

class CorpseCleaner {
  constructor(db) {
    super
    this.db = db
  }
}

module.exports = CorpseCleaner
