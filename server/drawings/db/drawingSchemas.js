const Joi = require('joi')

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
    creator: Joi.any().required().description('MongoID of creator Doodler'),
    anchorPoints: anchorPointsSchema
      .description('min and max x coords for top and bottom anchorPoints')
      .example({ top: [10, 100], bottom: [15, 140] }),
    canvas: Joi.object(),
  }).required(),
  update: Joi.object().keys({
    anchorPoints: Joi.any().strip(),
    creator: Joi.any().strip(),
    canvas: Joi.object(),
  }).required(),
}
