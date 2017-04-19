const drawings = require('./drawingsDB')
const testHelper = require('../../../db/testHelper')
const ObjectID = require('mongodb').ObjectID

const store = [
  {
    creator: {
      name: 'drawingsDBTest', id: '58cc21c72fbe8c108ba17fb8',
    },
    anchorPoints: { top: [10, 100], bottom: [40, 80] },
  },
  {
    creator: {
      name: 'drawingsDBTest', id: '58cc21c72fbe8c108ba17fb8',
    },
    anchorPoints: { top: [10, 80], bottom: [10, 110] },
  },
]

const validModel = {
  creator: { name: 'drawingsDBTest', id: '58cc21c72fbe8c108ba17fb8' },
  anchorPoints: {
    top: [10, 200],
    bottom: [20, 180],
  },
  canvas: `[[Layer: {}]]`,
  section: '58cc21c72fbe8c108ba17fb8',
}

describe('Drawings DB Tasks', () => {
  let db
  let corpse

  beforeAll(() => (
    testHelper.connectDB().then((database) => {
      db = database
      return db.collection('drawings').deleteMany({}).then(() => (
        db.collection('drawings').insertMany(store)
      ))
      .then(() => (
        db.collection('corpses').insertOne({
          creator: 'one',
          sections: [
            { description: 'Head', anchorPoints: { top: [0, 50], bottom: [51, 100] }, _id: ObjectID('123456789101') },
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
    test('should return found drawing', () => (
      db.collection('drawings').findOne({}).then((first) => {
        return drawings.find(db, first._id).then((drawing) => {
          expect(drawing).not.toBeNull()
          expect(drawing._id.toHexString()).toBe(first._id.toHexString())
        })
      })
    ))
  })

  describe('create', () => {
    test('should require creator', () => {
      const params = Object.assign({}, validModel, { section: corpse.sections[0]._id })
      delete params.creator
      return drawings.create(db, params).then((drawing) => {
        expect(drawing).toBeUndefined()
      })
      .catch((err) => {
        expect(err).not.toBeUndefined()
        expect(err.name).toBe('ValidationError')
        expect(err.details[0].message).toBe(`"creator" is required`)
      })
    })
    test('should copy anchorPoints', () => {
      const params = Object.assign({}, validModel, { section: corpse.sections[0]._id })
      delete params.anchorPoints
      return drawings.create(db, params).then((drawing) => {
        expect(drawing.anchorPoints).not.toBeUndefined()
      })
      .catch((err) => {
        expect(err).toBeUndefined()
      })
    })
    test('should have incomplete status', () => {
      const params = Object.assign({}, validModel, { section: corpse.sections[0]._id })
      delete params.anchorPoints
      return drawings.create(db, params).then((drawing) => {
        expect(drawing.status).toBe('incomplete')
      })
    })
  })

  describe('update', () => {
    test('should not set anchorPoints', () => {
      return db.collection('drawings').findOne({}).then((first) => {
        const params = Object.assign({ anchorPoints: { top: [1, 1] }, canvas: `[[Layer: 'hello']]` })
        return drawings.update(db, first._id, params).then((drawing) => {
          expect(drawing.anchorPoints).not.toBe([1, 1])
          expect(drawing.canvas).toEqual(`[[Layer: 'hello']]`)
        })
        .catch((err) => {
          expect(err).toBeUndefined()
        })
      })
    })
  })
})
