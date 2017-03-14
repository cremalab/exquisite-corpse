const Joi = require('joi')

module.exports = {
  create: Joi.object({
    creator: Joi.string().required(),
    guidePoints: Joi.object({
      top: Joi.array().required(),
      bottom: Joi.array().required(),
    }).required(),
    canvas: Joi.object().required(),
  }),
}
