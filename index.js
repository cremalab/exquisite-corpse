require('dotenv').config()
const compose = require('./serverComposer')

compose().then((server) => {
  server.start(() => {
    console.log('Server running yay')
  })
}).catch((err) => {
  console.log(err)
  throw err
})
