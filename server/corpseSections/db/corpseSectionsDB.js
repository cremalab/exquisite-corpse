const ObjectID = require('mongodb').ObjectID
const Boom = require('boom')

module.exports = {
  find(db, id) {
    return new Promise((resolve, reject) => {
      db.collection('corpses').findOne({
        'sections._id': ObjectID(id),
      }).then((result) => {
        if (!result) { reject(Boom.create(404, `Section with id ${id} not found`)) }
        resolve(result.sections.find(x => ObjectID(id).equals(x._id)))
      })
    })
  },
  addDrawer(db, id, user) {
    return new Promise((resolve, reject) => {
      db.collection('corpses').findOneAndUpdate({
        'sections._id': ObjectID(id),
      }, {
        $set: { 'sections.$.drawer': user },
      }).then((result) => {
        if (!result) { reject(Boom.create(404, `Section with id ${id} not found`)) }
        resolve(result.value.sections.find(x => ObjectID(id).equals(x._id)))
      })
    })
  }
}
