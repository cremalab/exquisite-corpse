const Joi = require('joi')

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
})

const corpseSection = Joi.object().keys({
  description: Joi.string().example('Torso')
    .description('description of what should be drawn for this section'),
  drawing: objectId.description('ObjectId of drawing for this section'),
  anchorPoints: anchorPointsSchema,
  _id: objectId.required(),
})

const corpse = Joi.object().keys({
  _id: objectId.required(),
  creator: objectId.required().description('ObjectId of creator Doodler'),
  sections: Joi.array().items(corpseSection).required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
})

module.exports = {
  list: Joi.object().keys({
    result: Joi.array(),
  }),
  single: Joi.object().keys({
    result: corpse.required(),
  }),
}
