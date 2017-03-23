const Joi = require('joi')

const corpseResponses = require('../../corpses/responses')

const user = Joi.object().keys({
  id: Joi.string().required().example('fh847172').description('Slack ID'),
  name: Joi.string().required().example('ross'),
})
const users = Joi.array().items(user)

module.exports = {
  lobby: Joi.object().keys({
    users,
    corpses: Joi.array().items(corpseResponses.corpse),
  }),
  connectedUsers: users,
}
