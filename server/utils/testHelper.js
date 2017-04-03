const compose = require('../../serverComposer')

module.exports = {
  session: {
    id: '1',
    name: 'Elmer',
  },
  testServer() {
    return compose()
  },
}
