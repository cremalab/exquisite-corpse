const ObjectID = require('mongodb').ObjectID
const Boom = require('boom')

module.exports = {
  find(db, id) {
    return db.collection('corpses').findOne({
      'sections._id': ObjectID(id),
    }).then((result) => {
      if (!result) { throw Boom.create(404, `Section with id ${id} not found`) }
      return result.sections.find(x => ObjectID(id).equals(x._id))
    })
  },
  findOldestEmpty(db) {
    return db.collection('corpses').findOne({
      'sections.drawing': null,
    }, {
      sort: { createdAt: -1 },
    }).then((result) => {
      if (!result) { throw Boom.create(404, `No corpses need drawings.`) }
      // Add corpse id to returned value
      return Object.assign(
        {},
        result.sections.find(s => !s.drawing),
        { corpse: result._id }
      )
    })
  },
  addDrawer(db, id, user) {
    return db.collection('corpses').findOneAndUpdate({
      'sections._id': ObjectID(id),
    }, {
      $set: { 'sections.$.drawer': user },
    }, {
      returnOriginal: false,
    }).then((result) => {
      const section = result.value.sections.find(x => ObjectID(id).equals(x._id))
      if (!result) { throw Boom.create(404, `Section with id ${id} not found`) }
      return Object.assign({}, section, { corpse: result.value._id })
    })
  },
  addDrawingId(db, id, drawingId, returnFullCorpse) {
    return db.collection('corpses').findOneAndUpdate({
      'sections._id': ObjectID(id),
    }, {
      $set: { 'sections.$.drawing': { _id: drawingId } },
    }, {
      returnOriginal: false,
    }).then((result) => {
      if (returnFullCorpse) { return result.value }
      const section = result.value.sections.find(x => ObjectID(id).equals(x._id))
      if (!result) { throw Boom.create(404, `Section with id ${id} not found`) }
      return section
    })
  },
  removeDrawing(db, id) {
    return db.collection('corpses').findOneAndUpdate({
      'sections._id': ObjectID(id),
    }, {
      $unset: {
        'sections.$.drawer': '',
        'sections.$.drawing': '',
      },
    }, {
      returnOriginal: false,
    }).then((result) => {
      const section = result.value.sections.find(x => ObjectID(id).equals(x._id))
      if (!result) { throw Boom.create(404, `Section with id ${id} not found`) }
      return section
    })
  }
}
