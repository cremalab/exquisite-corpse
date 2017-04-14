const Joi = require('joi')

const objectId = Joi.alternatives().try(Joi.string(), Joi.object(), Joi.number())

const user = Joi.object().keys({
  name: Joi.string().required().example('John'),
  id: objectId.required().example('12345J'),
  provider: Joi.string().example('Slack'),
})

const drawingSchema = Joi.object().keys({
  _id: Joi.any().required(),
  creator: user.required(),
  anchorPoints: Joi.object({
    top: Joi.array().items([Joi.number()])
      .required()
      .example([20, 200])
      .notes('min and max x coordinate for top anchors'),
    bottom: Joi.array().items([Joi.number()])
      .required()
      .example([50, 210])
      .notes('min and max x coordinate for bottom anchors'),
  }),
  canvas: Joi.string(),
  section: objectId.description('ObjectId of associated section of corpse'),
  corpse: objectId.description('ObjectId of associated corpse'),
  createdAt: Joi.date().timestamp('javascript').required(),
  updatedAt: Joi.date().timestamp('javascript').required(),
})

module.exports = {
  single: Joi.object().keys({
    result: drawingSchema,
  }),
  list: Joi.object().keys({
    result: Joi.array().items(drawingSchema),
  }),
}
