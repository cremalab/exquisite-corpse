const Joi = require('joi')

const objectId = Joi.alternatives().try(Joi.string(), Joi.object(), Joi.number())

const anchorPointsSchema = Joi.object().keys({
  top: Joi.array()
    .items([Joi.number()])
    .required()
    .example([20, 200])
    .notes('min and max x coordinate for top anchors'),
  bottom: Joi.array().items([Joi.number()])
    .required()
    .example([50, 210])
    .notes('min and max x coordinate for bottom anchors'),
})

const corpseSection = Joi.object().keys({
  description: Joi.string().example('Torso')
    .description('description of what should be drawn for this section'),
  drawing: objectId.description('ObjectId of drawing for this section'),
  anchorPoints: anchorPointsSchema,
  drawer: Joi.object().keys({
    name: Joi.string().required().example('Rob'),
    id: objectId.required().example('981123msf'),
    provider: Joi.string().required().example('slack')
  }).optional(),
  _id: objectId.required(),
})

const corpse = Joi.object().keys({
  _id: objectId.required(),
  description: Joi.string().optional().allow(null),
  creator: objectId.required().description('ObjectId of creator Doodler'),
  sections: Joi.array().items(corpseSection).required(),
  canvas: Joi.string(),
  size: Joi.object().keys({
    width: Joi.number().example(400),
    height: Joi.number().example(700),
  }).optional(),
  svgUrl: Joi.string().optional().example('http://exq-corpse.s3.amazonaws.com/uploads/corpses/58e64e693f98444ee9c5f5b2.svg'),
  pngUrl: Joi.string().optional().example('http://exq-corpse.s3.amazonaws.com/uploads/corpses/58e64e693f98444ee9c5f5b2.png'),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
  status: Joi.string().valid(['new', 'incomplete', 'complete']),
})

module.exports = {
  list: Joi.object().keys({
    result: Joi.array().items(corpse),
    pagination: Joi.object().keys({
      page: Joi.number().min(1).required(),
      next: Joi.number(),
      previous: Joi.number(),
      perPage: Joi.number(),
    }).required()
  }),
  single: Joi.object().keys({
    result: corpse.required(),
  }),
  destroyed: Joi.object().keys({
    result: Joi.object().keys({
      _id: objectId,
      removed: true,
    })
  }),
  corpse,
}
