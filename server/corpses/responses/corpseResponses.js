const Joi = require('joi')

const objectId = Joi.alternatives().try(Joi.string(), Joi.object())

const corpseSection = Joi.object().keys({
  description: Joi.string().example('Torso')
    .description('description of what should be drawn for this section'),
  drawing: objectId.description('ObjectId of drawing for this section'),
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
