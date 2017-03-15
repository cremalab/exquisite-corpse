const drawings = require('./drawingsDB')
const testHelper = require('../testHelper')

const store = [
  { creator: '2a', anchorPoints: { top: [10, 100], bottom: [40, 80] } },
  { creator: '2a', anchorPoints: { top: [10, 80], bottom: [10, 110] } },
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

describe('Drawings DB Tasks', () => {
  let db

  beforeAll(() => (
    testHelper.connectDB().then((database) => {
      db = database
      return db.collection('drawings').deleteMany({}).then(() => (
        db.collection('drawings').insertMany(store)
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
      const params = Object.assign({}, validModel)
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
    test('should require anchorPoints', () => {
      const params = Object.assign({}, validModel)
      delete params.anchorPoints
      return drawings.create(db, params).then((drawing) => {
        expect(drawing).toBeUndefined()
      })
      .catch((err) => {
        expect(err).not.toBeUndefined()
        expect(err.name).toBe('ValidationError')
        expect(err.details[0].message).toBe(`"anchorPoints" is required`)
      })
    })

    test('should require anchorPoints to be an object', () => {
      const params = Object.assign({}, validModel, { anchorPoints: [] })
      return drawings.create(db, params).then((drawing) => {
        expect(drawing).toBeUndefined()
      })
      .catch((err) => {
        expect(err).not.toBeUndefined()
        expect(err.name).toBe('ValidationError')
        expect(err.details[0].message).toBe(`"anchorPoints" must be an object`)
      })
    })

    test('should require anchorPoints to have top', () => {
      const params = Object.assign({}, validModel, { anchorPoints: {} })
      return drawings.create(db, params).then((drawing) => {
        expect(drawing).toBeUndefined()
      })
      .catch((err) => {
        expect(err).not.toBeUndefined()
        expect(err.name).toBe('ValidationError')
        expect(err.details[0].message).toBe(`"top" is required`)
      })
    })

    test('should require anchorPoints.top to have two values', () => {
      const params = Object.assign({}, validModel, { anchorPoints: { top: [1, 2, 3] } })
      return drawings.create(db, params).then((drawing) => {
        expect(drawing).toBeUndefined()
      })
      .catch((err) => {
        expect(err).not.toBeUndefined()
        expect(err.name).toBe('ValidationError')
        expect(err.details[0].message).toBe(`"top" must contain 2 items`)
      })
    })
  })

  describe('update', () => {
    test('should not set anchorPoints', () => {
      return db.collection('drawings').findOne({}).then((first) => {
        const params = Object.assign({ anchorPoints: { top: [1, 1] }, canvas: { Layer: 'hello' } })
        return drawings.update(db, first._id, params).then((drawing) => {
          expect(drawing.anchorPoints).not.toBe([1, 1])
          expect(drawing.canvas.Layer).toBe('hello')
        })
        .catch((err) => {
          expect(err).toBeUndefined()
        })
      })
    })
  })
})
