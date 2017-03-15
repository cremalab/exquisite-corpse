const corpses = require('./corpsesDB')
const testHelper = require('../../../db/testHelper')

const store = [
  { creator: '2a', section: [{ description: 'Head' }] },
  { creator: '2a', section: [{ description: 'Head' }] },
]

const validModel = {
  creator: '1a',
  anchorPoints: {
    top: [10, 200],
    bottom: [20, 180],
  },
  canvas: {
    Layer: {},
  },
}

describe('Corpses DB Tasks', () => {
  let db

  beforeAll(() => (
    testHelper.connectDB().then((database) => {
      db = database
      return db.collection('corpses').deleteMany({}).then(() => (
        db.collection('corpses').insertMany(store)
      ))
    })
  ))

  afterAll(() => db.close())

  describe('create', () => {
    test('should require creator', () => {
      const params = Object.assign({}, validModel)
      delete params.creator
      return corpses.create(db, params).then((corpse) => {
        expect(corpse).toBeUndefined()
      })
      .catch((err) => {
        expect(err).not.toBeUndefined()
        expect(err.name).toBe('ValidationError')
        expect(err.details[0].message).toBe(`"creator" is required`)
      })
    })
    test('should require sections', () => {
      const params = Object.assign({}, validModel)
      delete params.sections
      return corpses.create(db, params).then((corpse) => {
        expect(corpse).toBeUndefined()
      })
      .catch((err) => {
        expect(err).not.toBeUndefined()
        expect(err.name).toBe('ValidationError')
        expect(err.details[0].message).toBe(`"sections" is required`)
      })
    })

    test('should require at least two sections', () => {
      const params = Object.assign({}, validModel, { sections: [
        { description: 'Head' },
      ] })
      return corpses.create(db, params).then((corpse) => {
        expect(corpse).toBeUndefined()
      })
      .catch((err) => {
        expect(err).not.toBeUndefined()
        expect(err.name).toBe('ValidationError')
        expect(err.details[0].message).toBe(`"sections" must contain at least 2 items`)
      })
    })
  })

  describe('update', () => {
    test('should not set anchorPoints', () => {
      return db.collection('corpses').findOne({}).then((first) => {
        const params = { sections: [
          { description: 'Head' },
          { description: 'Torso' },
          { description: 'Legs' },
          { description: 'Feet' },
        ] }
        return corpses.update(db, first._id, params).then((corpse) => {
          expect(corpse.sections.length).toBe(4)
        })
        .catch((err) => {
          expect(err).toBeUndefined()
        })
      })
    })
  })
})
