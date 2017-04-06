const compose = require('../../serverComposer')

module.exports = {
  session: {
    id: '1',
    name: 'Elmer',
    provider: 'Slack',
  },
  testServer() {
    return compose()
  },
}
