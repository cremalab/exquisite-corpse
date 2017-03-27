const compose = require('../../serverComposer')

module.exports = {
  session: {
    profile: {
      user_id: 1,
      user: 'Elmer',
    },
  },
  testServer() {
    return compose()
  },
}
