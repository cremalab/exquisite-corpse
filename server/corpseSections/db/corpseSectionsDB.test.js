const corpseSections = require('./corpseSectionsDB')
const testHelper = require('../../../db/testHelper')
const ObjectID = require('mongodb').ObjectID

describe('CorpseSections DB', () => {
  let db
  let corpse

  beforeAll(() => (
    testHelper.connectDB().then((database) => {
      db = database

      return db.collection('corpses').deleteMany({}).then(() => (
        db.collection('corpses').insertOne({
          creator: 'one',
          sections: [
            { description: 'Head', anchorPoints: { top: [0, 50], bottom: [51, 100] }, _id: ObjectID('123456789199') },
            { description: 'Torso', anchorPoints: { top: [51, 100], bottom: [51, 100] }, _id: ObjectID('123456789102') },
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

  afterAll(() => db.close())

  describe('find', () => {
    test('should return found section', () => (
      corpseSections.find(db, '123456789199').then((section) => {
        expect(section).not.toBeNull()
        expect(section.description).toBe('Head')
        expect(section.anchorPoints).toMatchObject({ top: [0, 50], bottom: [51, 100] })
      })
    ))
  })

  describe('addDrawer', () => {
    test('should update section with drawer attribute', () => (
      corpseSections.addDrawer(db, '123456789199', { name: 'Bozo', _id: '1' })
        .then((section) => {
          expect(section).not.toBeNull()
          expect(section.drawer).not.toBeUndefined()
          expect(section).toBe('Bozo')
        })
    ))
    test('should update corpse record', () => (
      corpseSections.addDrawer(db, '123456789199', { name: 'Bozo', _id: '1' })
        .then(() => (
          db.collection('corpses').findOne({ _id: corpse._id })
        ))
        .then((result) => {
          expect(result.sections[0]).not.toBeNull()
          expect(result.sections[0].drawer).not.toBeNull()
        })
        .catch((err) => {
          expect(err).toBeNull()
        })
    ))
  })
})
