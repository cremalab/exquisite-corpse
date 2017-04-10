const Joi = require('joi')

const objectId = Joi.alternatives().try(Joi.string(), Joi.object())

const anchorPointsSchema = Joi.object().keys({
  top: Joi.array()
    .items([Joi.number(), Joi.number()])
    .required()
    .example([20, 200])
    .notes('min and max x coordinate for top anchors'),
  bottom: Joi.array().items([Joi.number(), Joi.number()])
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

const basicSection = Joi.object().keys({
  description: Joi.string().example('Torso')
    .description('description of what should be drawn for this section'),
  anchorPoints: Joi.array().items(Joi.number()).optional().min(2)
    .example([5, 200])
    .description(`X Coordinates of the bottom anchorPoints of the section`)
})

module.exports = {
  create: Joi.object().keys({
    creator: objectId.required().description('ObjectId of creator Doodler'),
    sections: Joi.array().items(corpseSection).min(2).required(),
    status: Joi.string().valid(['new', 'incomplete', 'complete']),
  }).required(),
  createFromRequest: Joi.object().keys({
    sections: Joi.array().items(basicSection).min(2).optional().example([
      { description: 'Head', anchorPoints: [1, 200] },
      { description: 'Torso', anchorPoints: [30, 150] },
    ]),
  }),
  update: Joi.object().keys({
    creator: objectId.strip(),
    sections: Joi.array().items(corpseSection).min(2),
    canvas: Joi.string(),
    status: Joi.string().valid(['new', 'incomplete', 'complete']),
    svgUrl: Joi.string().uri().example('http://exq-corpse.s3.amazonaws.com/uploads/corpses/58e64e693f98444ee9c5f5b2.svg'),
  }),
}
