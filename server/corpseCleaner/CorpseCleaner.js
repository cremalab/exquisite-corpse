const subMilliseconds = require('date-fns/sub_milliseconds')

const corpseRT = require('../corpses/realtime/corpsesRT')
const lobbyRT = require('../lobby/realtime/lobbyRT')
const common = require('../../db/common')
const DRAWING_EXPIRED = require('../lobby/realtime/eventTypes').DRAWING_EXPIRED

const minute = 60000
const hour = 60 * minute

const defaults = {
  guestWindow: 2 * hour,
  memberWindow: 24 * hour,
}

class CorpseCleaner {
  constructor(db, server, options) {
    this.db = db
    this.server = server
    this.settings = Object.assign(defaults, options)
  }
  findOldest() {
    const now = new Date()
    const cutoffDate = subMilliseconds(now, this.settings.memberWindow)
    return this.db.collection('drawings').find({
      status: 'incomplete',
      createdAt: {$lt: cutoffDate },
    }, {
      'corpse': 1 // projection
    }).toArray()
  }
  findGuest() {
    const now = new Date()
    const cutoffDate = subMilliseconds(now, this.settings.guestWindow)
    return this.db.collection('drawings').find({
      status: 'incomplete',
      createdAt: {$lt: cutoffDate },
      'creator.provider': 'guest',
    }, {
      'corpse': 1 // projection
    }).toArray()
  }
  clean() {
    console.log(`CorpseCleaner#clean at ${new Date()}`);
    return this.findOldest()
    .then((drawings) => (
      this.db.collection('drawings').update(
        { _id: { $in: drawings.map(d => d._id) } },
        { $unset: {corpse: ''}, $set: {status: 'expired'} },
        { multi: true } // return old doc so `corpse` is available
      ))
      .then(() => (
        this.db.collection('corpses').update(
          { _id: { $in: drawings.map(d => d.corpse) } },
          { $unset: {drawing: ''} }
        )
      ))
      .then(() => {
        drawings.map(d => d.corpse).forEach((id) => {
          corpseRT.notifyChange(this.server, {_id: id, drawing: null })
          lobbyRT.notifyCorpseChange(this.server, {_id: id, drawing: null })
          lobbyRT.notifyEvent(this.server, DRAWING_EXPIRED, {id: id})
        })
      })
      .then(() => drawings)
    )
  }
}

module.exports = CorpseCleaner
