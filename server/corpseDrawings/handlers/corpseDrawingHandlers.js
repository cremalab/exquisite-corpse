const Boom = require('boom')
const ObjectID = require('mongodb').ObjectID
const rt = require('../../corpses/realtime/corpsesRT')

const drawingsDB = require('../../drawings/db/drawingsDB')

module.exports = {
  create(request, reply) {
    const { db } = request.mongo
    const { payload } = request
    if (payload.section && !ObjectID.isValid(payload.section)) {
      return reply(Boom.create(400, 'Section is not a valid ObjectID'))
    }
    return drawingsDB.find(db, request.payload.drawing).then(drawing => (
      db.collection('corpses').findOneAndUpdate({
        _id: ObjectID(request.params.id),
        'sections._id': ObjectID(request.payload.section || drawing.section),
      }, {
        $set: { 'sections.$.drawing': drawing },
      })
    ))
  .then((r) => {
    rt.notifyChange(request.server, r.value)
    if (!r.value) { return reply(Boom.create(404, `Can't find Corpse with Section`)) }
    return reply({ result: r.value })
  })
    .catch(err => reply(err))
  },
}
