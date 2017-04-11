const Joi = require('joi')
const ObjectId = require('mongodb').ObjectId

const objectId = Joi.alternatives().try(Joi.string(), Joi.object())

const anchorPointsSchema = Joi.object().keys({
  top: Joi.array()
    .length(2)
    .items([Joi.number(), Joi.number()])
    .required()
    .example([20, 200])
    .notes('min and max x coordinate for top anchors'),
  bottom: Joi.array().max(2).items([Joi.number(), Joi.number()])
    .required()
    .example([50, 210])
    .notes('min and max x coordinate for bottom anchors'),
}).required()

module.exports = {
  create: Joi.object().keys({
    creator: Joi.object().keys({
      name: Joi.string(),
      id: Joi.string().required(),
      provider: Joi.string(),
    }).required().description('User info of drawer'),
    anchorPoints: anchorPointsSchema
      .description('min and max x coords for top and bottom anchorPoints')
      .example({ top: [10, 100], bottom: [15, 140] }),
    canvas: Joi.string(),
    section: objectId.required().example(new ObjectId()),
    corpse: objectId.required().example(new ObjectId()),
  }).required(),
  createPayload: Joi.object().keys({
    canvas: Joi.string().optional(),
    section: Joi.string().optional().example('58c9b9c50e66521616667ef1')
      .description('MongoID of Corpse Section the drawing is for')
      .notes('If none supplied, drawing will be created for the oldest corpse section needing a drawing'),
  }).required(),
  update: Joi.object().keys({
    anchorPoints: Joi.any().strip(),
    creator: Joi.any().strip(),
    canvas: Joi.string(),
  }).required(),
}
