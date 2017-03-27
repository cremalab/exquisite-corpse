require('dotenv').config()
const compose = require('./serverComposer')

compose().then((server) => {
  server.start(() => {
    console.log('Server running yay')
  })
}).catch((err) => {
  throw err
})
