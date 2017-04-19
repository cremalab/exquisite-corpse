var path = require('path')

module.exports = {
  context: __dirname,
  node: {
    __filename: true,
    __dirname: true,
  },
  resolve: {
    root: path.join(__dirname, "../client/src")
  }
}
