const subMilliseconds = require('date-fns/sub_milliseconds')

const corpseRT = require('../corpses/realtime/corpsesRT')
const lobbyRT = require('../lobby/realtime/lobbyRT')
const common = require('../../db/common')
const ObjectID = require('mongodb').ObjectID
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
      'corpse': 1, 'section': 1, creator: 1 // projection
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
      'corpse': 1, 'section': 1, creator: 1 // projection
    }).toArray()
  }
  clean() {
    console.log(`CorpseCleaner#clean at ${new Date()}`);
    let modifiedDrawings = []
    return this.findOldest().then(this.manipulate.bind(this))
      .then((results) => {
        modifiedDrawings = modifiedDrawings.concat(results)
        return
      })
      .then(() => this.findGuest()).then(this.manipulate.bind(this))
      .then((results) => {
        modifiedDrawings = modifiedDrawings.concat(results)
        console.log(`modified drawings: ${modifiedDrawings}`)
        return modifiedDrawings
      })
  }
  manipulate(drawings) {
    return this.db.collection('drawings').update(
      { _id: { $in: drawings.map(d => d._id) } },
      { $unset: {corpse: ''}, $set: {status: 'expired'} },
      { multi: true } // return old doc so `corpse` is available
    )
    .then(() => {
      return this.db.collection('corpses').update(
        { 'sections._id': { $in: drawings.map(d => d.section) } },
        { $unset: {
          'sections.$.drawer': '',
          'sections.$.drawing': '',
        }}
      )
    })
    .then(() => {
      drawings.forEach((drawing) => {
        if (this.server) {
          corpseRT.notifyChange(this.server, {_id: drawing.id, drawing: null })
          lobbyRT.notifyCorpseChange(this.server, {_id: drawing.corpse, drawing: null })
          lobbyRT.notifyEvent(this.server, DRAWING_EXPIRED, drawing)
        }
      })
    })
    .then(() => drawings)
  }
}

module.exports = CorpseCleaner
