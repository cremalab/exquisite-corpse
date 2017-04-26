const compose = require('../../serverComposer')

module.exports = {
  session: {
    id: '1',
    name: 'Elmer',
    provider: 'Slack',
  },
  testServer() {
    console.log('mongo test uri', process.env.MONGODB_TEST_URI);
    console.log('mongo uri', process.env.MONGODB_URI);
    console.log('env dump', process.env);
    return compose()
  },
}
