const corpses = require('./corpsesDB')
const testHelper = require('../../../db/testHelper')

const store = [
  { creator: '58cc21c72fbe8c108ba17fb8', section: [{ description: 'Head' }] },
  { creator: '58cc21c72fbe8c108ba17fb8', section: [{ description: 'Head' }] },
]

const validModel = {
  creator: '58cc21c72fbe8c108ba17fb8',
  sections: [
    { description: 'Head' },
    { description: 'Torso' },
    { description: 'Legs' },
    { description: 'Feet' },
  ],
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

  describe('idSections', () => {
    test('should convert sections to object', () => {
      const res = corpses.idSections([
        { description: 'Head' },
        { description: 'Torso' },
        { description: 'Legs' },
      ])
      expect(Array.isArray(res)).toBe(true)
      expect(res[0]._id).not.toBeUndefined()
    })
  })

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

    test('should create _ids for sections', () => {
      const params = Object.assign({}, validModel, { sections: [
        { description: 'Head' },
        { description: 'Torso' },
      ] })
      return corpses.create(db, params).then((corpse) => {
        expect(corpse.sections[0]._id).not.toBeUndefined()
      })
      .catch((err) => {
        expect(err).toBeUndefined()
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

  describe('generate', () => {
    test('should return object', () => {
      const generated = corpses.generate()
      expect(typeof generated).toBe('object')
    })
    test('should have generated sections', () => {
      const generated = corpses.generate()
      expect(generated.sections).not.toBeUndefined()
      expect(Array.isArray(generated.sections)).toBe(true)
    })
    test('should have sections with anchorPoints', () => {
      const generated = corpses.generate()
      const anchorPoints = generated.sections.map(x => x.anchorPoints)
      expect(anchorPoints.length).toBe(4)
      anchorPoints.map(x => Object.keys(x)).forEach((p) => {
        expect(p[0]).toBe('bottom')
        expect(p[1]).toBe('top')
      })
      anchorPoints.map(x => Object.values(x)).forEach((p) => {
        expect(Array.isArray(p[0])).toBe(true)
        expect(Array.isArray(p[1])).toBe(true)
      })
    })
  })
})
