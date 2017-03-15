const Joi = require('joi')
const Boom = require('boom')
const common = require('../../../db/common')
const corpseSchemas = require('./corpseSchemas')
const ObjectID = require('mongodb').ObjectID

const dbSchema = Joi.object().required()

module.exports = {
  idSections(sections) {
    return sections.map(s => (
      Object.assign({}, s, { _id: new ObjectID() })
    ))
  },
  getAll(db) {
    return new Promise((resolve, reject) => {
      Joi.validate(db, dbSchema, (err) => {
        if (err) reject(err)
        db.collection('corpses').find({}).then(resolve)
      })
    })
  },
  find(db, id) {
    return common.find(db, id, 'corpses')
  },
  create(db, params) {
    return new Promise((resolve, reject) => {
      if (!params) { reject(Boom.create(422, 'Params are required')) }
      try {
        Joi.assert(db, dbSchema)
        Joi.assert(params, corpseSchemas.create)
      } catch (e) {
        reject(e)
      }
      const attrs = Object.assign({}, params, {
        sections: this.idSections(params.sections),
      })
      return common.create(db, attrs, 'corpses').then(resolve).catch(reject)
    })
  },
  update(db, id, params) {
    return new Promise((resolve, reject) => {
      let attributes
      if (!params) { reject(Boom.create(422, 'Params are required')) }
      try {
        Joi.assert(db, dbSchema)
        attributes = Joi.attempt(params, corpseSchemas.update)
      } catch (e) {
        reject(e)
      }
      return common.update(db, id, attributes, 'corpses')
        .then(resolve).catch(reject)
    })
  },
}
