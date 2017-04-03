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
  chatMessage: Joi.object().keys({
    result: Joi.object().keys({
      name: Joi.string().required().example('Ross'),
      id: Joi.string().required().example('238f828f8hg'),
      timestamp: Joi.string().required().example('2017-03-31T18:50:27.113Z'),
      content: Joi.string().required().example('Everything is great.'),
    }),
  }),
}
