const Joi = require('joi')
const Boom = require('boom')
const common = require('../common')
const drawingSchemas = require('./drawingSchemas')

const dbSchema = Joi.object().required()

module.exports = {
  getAll(db) {
    return new Promise((resolve, reject) => {
      Joi.validate(db, dbSchema, (err) => {
        if (err) reject(err)
        db.collection('drawings').find({}).then(resolve)
      })
    })
  },
  find(db, id) {
    return common.find(db, id, 'drawings')
  },
  create(db, params) {
    return new Promise((resolve, reject) => {
      if (!params) { reject(Boom.create(422, 'Params are required')) }
      try {
        Joi.assert(db, dbSchema)
        Joi.assert(params, drawingSchemas.create)
      } catch (e) {
        reject(e)
      }
      return common.create(db, params, 'drawings').then(resolve).catch(reject)
    })
  },
  update(db, id, params) {
    return new Promise((resolve, reject) => {
      let attributes
      if (!params) { reject(Boom.create(422, 'Params are required')) }
      try {
        Joi.assert(db, dbSchema)
        attributes = Joi.attempt(params, drawingSchemas.update)
      } catch (e) {
        reject(e)
      }
      return common.update(db, id, attributes, 'drawings')
        .then(resolve).catch(reject)
    })
  },
}
