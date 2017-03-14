const Joi = require('joi')
const Boom = require('boom')

const dbSchema = Joi.any().required()

module.exports = {
  find(db, id, collection) {
    return new Promise((resolve, reject) => {
      try {
        Joi.assert(collection, Joi.string().required(), 'Collection')
        Joi.assert(id, Joi.string().required(), 'ID')
        Joi.assert(db, dbSchema, 'DB instance')
      } catch (e) {
        return reject(e)
      }
      return db.collection(collection).findOne({ _id: id }, (err, r) => {
        if (err) { reject(err) }
        if (!r) { reject(Boom.create(404, `Record with id ${id} not found`)) }
        return resolve(r)
      })
    })
  },
  create(db, params, collection) {
    return new Promise((resolve, reject) => {
      db.collection(collection).insert(params, (err, r) => {
        if (err) { reject(err) }
        return resolve(r)
      })
    })
  },
  update(db, id, params, collection) {
    return new Promise((resolve, reject) => {
      try {
        Joi.assert(params, Joi.object({}).unknown().required(), 'Params')
        Joi.assert(id, Joi.string().required(), 'ID')
        Joi.assert(collection, Joi.string().required(), 'Collection')
        Joi.assert(db, dbSchema, 'DB instance')
      } catch (e) {
        return reject(e)
      }
      return db.collection(collection).findOneAndUpdate(
        { _id: id }, // find criteria
        { $set: params },
        { returnOriginal: false },
        (err, result) => {
          if (err) reject(err)
          return resolve(result)
        },
      )
    })
  },
}
