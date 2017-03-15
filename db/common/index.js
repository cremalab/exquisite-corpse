const Joi = require('joi')
const Boom = require('boom')
const ObjectId = require('mongodb').ObjectId

const dbSchema = Joi.any().required()
const idSchema = Joi.alternatives().try(Joi.string(), Joi.object())

function getValue(prop) {
  return prop.value
}

function timestamp(attrs) {
  return Object.assign({}, attrs, { createdAt: new Date(), updatedAt: new Date() })
}

module.exports = {
  find(db, id, collection) {
    return new Promise((resolve, reject) => {
      try {
        Joi.assert(collection, Joi.string().required(), 'Collection')
        Joi.assert(id, idSchema.required(), 'ID')
        Joi.assert(db, dbSchema, 'DB instance')
        if (!ObjectId.isValid(id)) { reject(Boom.create(400, 'ID not valid ObjectID ')) }
      } catch (e) {
        return reject(e)
      }
      return db.collection(collection).findOne(ObjectId(id)).then((result) => {
        if (!result) { reject(Boom.create(404, `Record with id ${id} not found`)) }
        resolve(result)
      }).catch(reject)
    })
  },
  create(db, params, collection) {
    return db.collection(collection).insertOne(timestamp(params)).then(res => (
      db.collection(collection).findOne({ _id: res.insertedId })
    ))
  },
  update(db, id, params, collection) {
    return new Promise((resolve, reject) => {
      try {
        Joi.assert(params, Joi.object({}).unknown().required(), 'Params')
        Joi.assert(id, idSchema.required(), 'ID')
        Joi.assert(collection, Joi.string().required(), 'Collection')
        Joi.assert(db, dbSchema, 'DB instance')
      } catch (e) {
        return reject(e)
      }
      const opts = { returnOriginal: false }
      return db.collection(collection).findOneAndUpdate({ _id: id }, { $set: params }, opts)
        .then(getValue).then(resolve)
        .catch(reject)
    })
  },
}
