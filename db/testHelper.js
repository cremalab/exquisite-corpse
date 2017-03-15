const MongoClient = require('mongodb').MongoClient
const mongoURI = process.env.MONGO_TEST_URL || 'mongodb://localhost:27017/exquisite-test'

module.exports = {
  connectDB() {
    return MongoClient.connect(mongoURI)
  },
}
