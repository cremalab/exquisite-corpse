const Joi = require('joi')
const ObjectID = require('mongodb').ObjectID
const common = require('../../../db/common')
const schemas = require('./reputationSchemas')
const Boom = require('boom')

module.exports = {
  find(db, id) {
    return db.collection('reputations').findOne({
      '_id': ObjectID(id),
    }).then((result) => {
      if (!result) { throw Boom.create(404, `Reputation with id ${id} not found`) }
      return result
    })
  },
  findBySubject(db, collection, id) {
    return db.collection('reputations').findOne({
      'subject_id': ObjectID(id),
      'subject_collection': collection,
    }).then((result) => {
      if (!result) { throw Boom.create(404, `Reputation with collection ${collection} and id ${id} not found`) }
      return result
    })
  },
  create(db, collection, id) {
    if (!collection || !id) { return Promise.reject('Collection and ID required') }
    const attrs = {
      subject_collection: collection,
      subject_id: id,
      opinions: [],
      score: 0,
    }
    try {
      Joi.assert(attrs, schemas.create)
    } catch (e) {
      return Promise.reject(Promise.reject(Boom.wrap(e)))
    }
    return common.create(db, attrs, 'reputations')
  },
  addOpinion(db, collection, id, score, user_id) {
    return db.collection('reputations').findAndModify({
      query: { subject_collection: collection, subject_id: id },
      update: {
        $setOnInsert: { opinions: [], score: 0 },
        $addToSet: { opinions: { user_id, score } },
        $inc: { score: score }
      },
      upsert: true,
      new: true,
    })
      .then((result) => {
        if (!result) { return Promise.reject('something went wrong') }
        return db.collection(collection).findAndModify({
          query: { _id: id },
          update: {
            $inc: { score: score }
          },
          new: true,
        })
          .then((subject) => {
            return {
              subject,
              reputation: result
            }
          })
      })
  },
  removePositiveOpinion(db, collection, id, user_id) {
    return db.collection('reputations').findAndModify({
      query: { subject_collection: collection, subject_id: id, user_id },
      update: {
        $pull: { opinions: { $eq: { user_id, score: 1 } } },
        $inc: { score: -1 }
      }
    })
  },
  getUserOpinion(db, collection, id, user_id) {
    return db.collection('reputations').findOne({
      subject_collection: collection,
      subject_id: id,
      'opinions.user_id': user_id
    })
      .then((result) => {
        if (!result) { return Promise.reject('Cannot find opinion') }
        return result.opinions.find(x => x.user_id === user_id)
      })
  }
}
