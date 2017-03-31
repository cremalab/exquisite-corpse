const Boom = require('boom')
const ObjectID = require('mongodb').ObjectID
const canvasCombiner = require('../lib/canvasCombiner')
const rt = require('../../corpses/realtime/corpsesRT')
const corpsesDB = require('../../corpses/db/corpsesDB')

const drawingsDB = require('../../drawings/db/drawingsDB')

function isComplete(payload) {
  return payload.sections.map(s => s.drawing && s.drawing.canvas !== undefined)
    .every(s => s === true)
}

function notifyCompletion(server, payload) {
  rt.notifyCompletion(server, payload)
}

function checkCompletion(server, db, payload) {
  if (isComplete(payload)) {
    return corpsesDB.update(db, payload._id, {
      canvas: canvasCombiner.stitch(payload.sections.map(s => s.drawing.canvas)),
      status: 'complete',
    }).then((result) => {
      notifyCompletion(server, result)
      return result
    })
  }

  return Promise.resolve(payload)
}

module.exports = {
  create(request, reply) {
    const { db } = request.mongo
    const { payload } = request
    return drawingsDB.find(db, request.params.id).then(drawing => (
      db.collection('corpses').findOneAndUpdate({
        'sections._id': ObjectID(drawing.section),
      }, {
        $set: { 'sections.$.drawing': drawing },
      }, {
        returnOriginal: false,
      })
    ))
    .then((r) => {
      if (!r.value) { return reply(Boom.create(404, `Can't find Corpse with Section`)) }
      rt.notifyChange(request.server, r.value)
      return checkCompletion(request.server, db, r.value).then(result => (
        reply({ result })
      ))
    })
      .catch(err => reply(err))
  },
}
