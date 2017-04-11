const Joi = require('joi')
const Boom = require('boom')
const common = require('../../../db/common')
const corpseSchemas = require('./corpseSchemas')
const ObjectID = require('mongodb').ObjectID
const utils = require('../../utils')

const dbSchema = Joi.object().required()

function generateAnchorPoint() {
  const left = utils.randomBetween(0, utils.canvasWidth / 2)
  const right = utils.randomBetween(utils.canvasWidth / 2, utils.canvasWidth)
  return [left, right]
}

function addBottom(section) {
  return Object.assign({}, section, {
    anchorPoints: {
      bottom: generateAnchorPoint(),
    },
  })
}

function addTop(section, i, arr) {
  const prev = arr[i - 1]
  let top
  if (prev) {
    top = prev.anchorPoints.bottom
  } else {
    top = generateAnchorPoint()
  }
  const mod = Object.assign({}, section, {
    anchorPoints: Object.assign(section.anchorPoints, { top }),
  })
  return mod
}

function defaultCorpse() {
  const sections = [
    { description: 'Head' },
    { description: 'Torso' },
    { description: 'Legs' },
    { description: 'Feet' },
  ].map(addBottom).map(addTop)
  return { sections, status: 'new' }
}

module.exports = {
  idSections(sections) {
    return sections.map(s => (
      Object.assign({}, s, { _id: new ObjectID() })
    ))
  },
  getAll(db, options = {}) {
    return new Promise((resolve, reject) => {
      try {
        Joi.assert(db, dbSchema)
      } catch (e) {
        return reject(Boom.wrap(e))
      }
      return db.collection('corpses').find({}, options).toArray().then(resolve)
    })
  },
  find(db, id) {
    return common.find(db, id, 'corpses')
  },
  findBySection(db, section) {
    return common.findBy(db, { 'sections._id': ObjectID(section) }, 'corpses')
  },
  create(db, params = {}) {
    return new Promise((resolve, reject) => {
      // Merge with default Corpse and add IDs to sections
      const generated = defaultCorpse()
      const attrs = Object.assign({ }, params, generated, {
        sections: this.idSections(generated.sections),
      })
      try {
        Joi.assert(db, dbSchema)
        Joi.assert(attrs, corpseSchemas.create)
      } catch (e) {
        return reject(Boom.wrap(e))
      }
      return common.create(db, attrs, 'corpses').then(resolve).catch(reject)
    })
  },
  generate(params = {}) {
    return Object.assign({}, params, defaultCorpse())
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
