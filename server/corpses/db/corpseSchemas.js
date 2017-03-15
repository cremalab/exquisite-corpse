const Joi = require('joi')

const objectId = Joi.alternatives().try(Joi.string(), Joi.object())
const corpseSection = Joi.object().keys({
  description: Joi.string().example('Torso')
    .description('description of what should be drawn for this section'),
  drawing: Joi.objectId().description('ObjectId of drawing for this section'),
})

module.exports = {
  create: Joi.object().keys({
    creator: objectId.required().description('ObjectId of creator Doodler'),
    sections: Joi.array().items(corpseSection).min(2).required(),
  }).required(),
  update: Joi.object().keys({
    creator: objectId.strip(),
    sections: Joi.array().items(corpseSection).min(2).required(),
  }),
}
