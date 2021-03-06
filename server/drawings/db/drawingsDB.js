const Joi = require('joi')
const Boom = require('boom')
const common = require('../../../db/common')
const corpseSections = require('../../corpseSections/db/corpseSectionsDB')
const drawingSchemas = require('./drawingSchemas')
const ObjectId = require('mongodb').ObjectId

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
  getByUser(db, user, status) {
    const criteria = { 'creator.id': user }
    if (status) {
      criteria['status'] = status
    }
    return new Promise((resolve, reject) => {
      Joi.validate(db, dbSchema, (err) => {
        if (err) reject(err)
        db.collection('drawings').find(criteria).toArray()
        .then((result) => {
          resolve(result)
        })
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
      let getSection = () => Promise.resolve({_id: params.section})
      if (!params.section) {
        getSection = corpseSections.findOldestEmpty
      }
      getSection(db).then((section) => {
        corpseSections.addDrawer(db, section._id, params.creator).then((section) => {
          const attrs = Object.assign({}, params, {
            section: ObjectId(section._id),
            anchorPoints: section.anchorPoints,
            corpse: section.corpse,
            status: 'incomplete',
          })
          Joi.attempt(attrs, drawingSchemas.create)
          return common.create(db, attrs, 'drawings').then(resolve).catch(reject)
        }).catch(reject)
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
  destroy(db, id, returnSection) {
    return new Promise((resolve, reject) => {
      let sectionId
      common.find(db, id, 'drawings').then(drawing => {
        sectionId = drawing.section
        return corpseSections.removeDrawing(db, drawing.section)
      })
      .then(() => (
        common.destroy(db, id, 'drawings')
      ))
      .then(() => {
        if (returnSection) { return resolve(sectionId)}
        return resolve()
      })
      .catch(reject)
    })
  },
  orphanize(db, id) {
    return db.collection('drawings').findAndModify(
      { 'corpse': ObjectId(id) },
      null,
      { $unset: {corpse: ''} },
      { new: true }
    )
  }
}
