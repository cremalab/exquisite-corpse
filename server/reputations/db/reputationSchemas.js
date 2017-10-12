const Joi = require('joi')

const objectId = Joi.alternatives().try(Joi.string(), Joi.object())

const opinion = Joi.object().keys({
  user_id: objectId.required(),
  score: Joi.number().integer().valid([1, -1]),
})

const reputation = Joi.object().keys({
  subject_collection: Joi.string().required(),
  subject_id: objectId.required(),
  opinions: Joi.array().items(opinion).required(),
  score: Joi.number().integer(),
})

module.exports = {
  create: reputation,
  show: reputation.keys({_id: objectId.required()}),
}
