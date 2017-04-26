const MongoClient = require('mongodb').MongoClient
let mongoURI
if (process.env.NODE_ENV === 'test') {
  if (process.env.HEROKU_TEST_RUN_ID) { mongoURI = process.env.MONGODB_URI }
  else { mongoURI = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/exquisite-test'}
} else {
  mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/exquisite-corpse'
}

module.exports = {
  connectDB() {
    return MongoClient.connect(mongoURI)
  },
}
