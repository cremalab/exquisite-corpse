const Joi = require('joi')
const common = require('../common')
const doodleSchemas = require('./doodleSchemas')

const dbSchema = Joi.object().required()

module.exports = {
  getAll(db) {
    return new Promise((resolve, reject) => {
      Joi.validate(db, dbSchema, (err) => {
        if (err) reject(err)
        db.collection('doodles').find({}).then(resolve)
      })
    })
  },
  find(db, id) {
    return common.find(db, id, 'doodles')
  },
  create(db, params) {
    return new Promise((resolve, reject) => {
      try {
        Joi.assert(db, dbSchema)
        Joi.assert(params, doodleSchemas.create)
      } catch (e) {
        reject(e)
      }
      return common.create(db, params, 'doodles')
    })
  },
  update(db, id, params) {
    return common.update(db, id, params, 'doodles')
  },
}
