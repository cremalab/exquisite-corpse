const Joi = require('joi')

module.exports = {
  list: Joi.object().keys({
    result: Joi.array(),
  }),
}
