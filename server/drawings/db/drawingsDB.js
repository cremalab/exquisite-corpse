const Joi = require('joi')
const Boom = require('boom')
const common = require('../../../db/common')
const corpseSections = require('../../corpseSections/db/corpseSectionsDB')
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
      } catch (e) {
        reject(e)
      }
      corpseSections.addDrawer(db, params.section, params.creator).then((section) => {
        const attrs = Object.assign({}, params, { anchorPoints: section.anchorPoints })
        Joi.attempt(attrs, drawingSchemas.create)
        return common.create(db, attrs, 'drawings').then(resolve).catch(reject)
      }).catch(reject)
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
  destroy(db, id) {
    return new Promise((resolve, reject) => {
      common.find(db, id, 'drawings').then(drawing => (
        corpseSections.removeDrawing(db, drawing.section)
      ))
      .then(() => (
        common.destroy(db, id, 'drawings')
      ))
      .then(resolve)
      .catch(reject)
    })
  }
}
