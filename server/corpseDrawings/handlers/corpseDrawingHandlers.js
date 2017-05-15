const Boom = require('boom')
const ObjectID = require('mongodb').ObjectID
const canvasCombiner = require('../lib/canvasCombiner')
const canvasUploader = require('../lib/canvasUploader')
const svgPrinter = require('../lib/svgPrinter')
const rt = require('../../corpses/realtime/corpsesRT')
const lobbyRT = require('../../lobby/realtime/lobbyRT')
const eventTypes = require('../../lobby/realtime/eventTypes')
const corpsesDB = require('../../corpses/db/corpsesDB')
const drawingsDB = require('../../drawings/db/drawingsDB')

function isComplete(payload) {
  return payload.sections.map(s => s.drawing && s.drawing.canvas !== undefined)
    .every(s => s === true)
}

function notifyCompletion(server, payload, user) {
  rt.notifyCompletion(server, payload)
  lobbyRT.notifyEvent(server, eventTypes.CORPSE_COMPLETED, {
    corpse: payload, credentials: user,
  })
}

function handleCompletion(server, db, payload, user) {
  if (isComplete(payload)) {
    const { json, project } = canvasCombiner.stitch(payload.sections.map(s => s.drawing.canvas))
    const size = canvasCombiner.getDimensionsFromJSON(json)
    const svg = project.exportSVG({ asString: true, bounds: 'content' })

    canvasUploader.uploadAndUpdate(server, project, String(payload._id), svg)
    svgPrinter.send(svg)

    return corpsesDB.update(db, payload._id, {
      canvas: json,
      size,
      status: 'complete',
    }).then((result) => {
      notifyCompletion(server, result, user)
      return result
    })
  }

  return Promise.resolve(payload)
}

module.exports = {
  create(request, reply) {
    const user = request.auth.credentials
    const { db } = request.mongo
    let sectionId
    return drawingsDB.update(db, request.params.id, { status: 'complete' })
    .then(drawing => {
      sectionId = drawing.section
      return db.collection('corpses').findOneAndUpdate({
        'sections._id': ObjectID(drawing.section),
      }, {
        $set: { 'sections.$.drawing': drawing },
      }, {
        returnOriginal: false,
      })
    })
    .then((r) => {
      if (!r.value) { return reply(Boom.create(404, `Can't find Corpse with Section`)) }
      rt.notifyChange(request.server, r.value)
      const data = {
        corpse: r.value,
        credentials: user,
        section: sectionId,
        drawing: request.params.id,
      }
      lobbyRT.notifyEvent(request.server, eventTypes.DRAWING_COMPLETED, data)
      lobbyRT.notifyCorpseChange(request.server, r.value)
      return handleCompletion(request.server, db, r.value, user).then(result => (
        reply({ result })
      ))
    })
      .catch(err => reply(err))
  },
}
