const common = require('./index')
const testHelper = require('../testHelper')
const ObjectId = require('mongodb').ObjectId

const store = {
  things: [
    { _id: ObjectId('1a9999999999'), name: 'Baseball Bat', sporty: true },
    { _id: ObjectId('1b9999999999'), name: 'French Fry', sporty: false },
  ],
  people: [
    { _id: '2b', name: 'Alan Parsons', musical: true },
    { _id: '3b', name: 'George Brett', musical: false },
  ],
}


describe('Common DB Tasks', () => {
  let db

  beforeAll(() => (
    testHelper.connectDB().then((database) => {
      db = database
      return db.collection('things').deleteMany({}).then(() => (
        db.collection('things').insertMany(store.things)
      ))
    })
  ))

  afterAll(() => db.close())

  describe('find', () => {
    test('should reject with error if missing db instance', () => (
      common.find(undefined, '1a9999999999', 'things').then((r) => {
        expect(r).not.toBeDefined()
      })
      .catch((err) => {
        expect(err).toBeDefined()
        expect(err.name).toBe('ValidationError')
      })
    ))

    test('should reject with error if missing id', () => (
      common.find(db, null, 'things').then((r) => {
        expect(r).not.toBeDefined()
      })
      .catch((err) => {
        expect(err).toBeDefined()
        expect(err.name).toBe('ValidationError')
      })
    ))

    test('should return error if missing collection', () => (
      common.find(db, '1a9999999999', undefined).then((r) => {
        expect(r).not.toBeDefined()
      })
      .catch((err) => {
        expect(err).toBeDefined()
        expect(err.name).toBe('ValidationError')
      })
    ))

    test('should return one result if found', () => (
      common.find(db, '1a9999999999', 'things').then((r) => {
        expect(r).toBeDefined()
        expect(r._id.toHexString()).toBe(store.things[0]._id.toHexString())
      })
    ))

    test('should reject if not found', () => (
      common.find(db, '229999999999', 'things').then((r) => {
        expect(r).not.toBeDefined()
      }).catch((err) => {
        expect(err).toBeDefined()
        expect(err.message).toBe('Record with id 229999999999 not found')
      })
    ))
  })

  describe('create', () => {
    test('should insert record into collection', () => (
      common.create(db, { name: 'Waffle', sporty: false }, 'things').then(() => {
        db.collection('things').findOne({ name: 'Waffle' }, (err, found) => {
          expect(err).toBeNull()
          expect(found).toBeDefined()
          expect(found.name).toBe('Waffle')
        })
      })
    ))

    test('should return newly created record', () => (
      common.create(db, { name: 'Waffle', sporty: false }, 'things').then((r) => {
        expect(r).toMatchObject({ name: 'Waffle', sporty: false })
      })
    ))
  })

  describe('update', () => {
    test('should reject with error if missing db instance', () => (
      common.update(undefined, '1a', { name: 'Tumeric' }, 'things').then((r) => {
        expect(r).not.toBeDefined()
      })
      .catch((err) => {
        expect(err).toBeDefined()
        expect(err.name).toBe('ValidationError')
      })
    ))

    test('should reject with error if missing id', () => (
      common.update(db, null, { name: 'Tumeric' }, 'things').then((r) => {
        expect(r).not.toBeDefined()
      })
      .catch((err) => {
        expect(err).toBeDefined()
        expect(err.name).toBe('ValidationError')
      })
    ))

    test('should reject with error if missing params', () => (
      common.update(db, '1a', undefined, 'things').then((r) => {
        expect(r).not.toBeDefined()
      })
      .catch((err) => {
        expect(err).toBeDefined()
        expect(err.name).toBe('ValidationError')
      })
    ))

    test('should reject with error if missing collection', () => (
      common.update(db, '1a', { name: 'Tumeric' }).then((r) => {
        expect(r).not.toBeDefined()
      })
      .catch((err) => {
        expect(err).toBeDefined()
        expect(err.name).toBe('ValidationError')
      })
    ))

    // test('should update with supplied params', () => (
    //   common.update(db, '1a', { name: 'Cricket Bat' }, 'things').then((r) => {
    //     expect(r).toBeDefined()
    //     console.log(r);
    //     // expect(r).toMatchObject(store.things[0])
    //   })
    // ))
  })
})
