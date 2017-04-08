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
  anchorPoints: anchorPointsSchema,
  _id: objectId.description('ObjectID of section'),
})

module.exports = {
  create: Joi.object().keys({
    creator: objectId.required().description('ObjectId of creator Doodler'),
    sections: Joi.array().items(corpseSection).min(2).required(),
    status: Joi.string().valid(['new', 'incomplete', 'complete']),
  }).required(),
  update: Joi.object().keys({
    creator: objectId.strip(),
    sections: Joi.array().items(corpseSection).min(2),
    canvas: Joi.string(),
    status: Joi.string().valid(['new', 'incomplete', 'complete']),
    svgUrl: Joi.string().uri().example('http://exq-corpse.s3.amazonaws.com/uploads/corpses/58e64e693f98444ee9c5f5b2.svg'),
  }),
}
