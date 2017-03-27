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
      return section
    })
  }
}
