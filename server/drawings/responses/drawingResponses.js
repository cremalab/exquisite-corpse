const Joi = require('joi')

const drawingSchema = Joi.object().keys({
  _id: Joi.any().required(),
  creator: Joi.string().required(),
  anchorPoints: Joi.object({
    top: Joi.array().max(2).items([Joi.number(), Joi.number()])
      .required()
      .example([20, 200])
      .notes('min and max x coordinate for top anchors'),
    bottom: Joi.array().max(2).items([Joi.number(), Joi.number()])
      .required()
      .example([50, 210])
      .notes('min and max x coordinate for bottom anchors'),
  }).required(),
  canvas: Joi.object().required(),
})

module.exports = {
  single: Joi.object().keys({
    result: drawingSchema,
  }),
}
