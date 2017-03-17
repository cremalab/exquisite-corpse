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
}
