const corpseSections = require('./corpseSectionsDB')
const testHelper = require('../../../db/testHelper')
const ObjectID = require('mongodb').ObjectID

describe('Reputations DB', () => {
  let db
  let corpse

  beforeAll(() => (
    testHelper.connectDB().then((database) => {
      db = database

      return db.collection('corpses').deleteMany({}).then(() => (
        db.collection('corpses').insertOne({
          creator: 'one',
          sections: [
            {
              description: 'Head',
              anchorPoints: { top: [0, 50], bottom: [51, 100] },
              _id: ObjectID('123456789199'),
              drawing: { _id: ObjectID('123456789223') } },
            {
              description: 'Torso',
              anchorPoints: { top: [51, 100], bottom: [51, 100] },
              _id: ObjectID('123456789102'),
              drawing: { _id: ObjectID('123456789234') } },
          ],
        })
      ))
      .then(() => (
        db.collection('corpses').findOne({ creator: 'one' }).then((result) => {
          corpse = result
        })
      ))
    })
  ))

  afterAll(() => (
    Promise.all([
      db.collection('corpses').deleteMany({}),
      db.close()
    ])
  ))

})
