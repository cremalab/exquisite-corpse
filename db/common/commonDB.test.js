const common = require('./index')
const MongoMock = require('mongodb-test-mock')

const store = {
  things: [
    { _id: '1a', name: 'Baseball Bat', sporty: true },
    { _id: '1b', name: 'French Fry', sporty: false },
  ],
  people: [
    { _id: '2b', name: 'Alan Parsons', musical: true },
    { _id: '3b', name: 'George Brett', musical: false },
  ],
}

describe('Common DB Tasks', () => {
  let db

  beforeEach(() => {
    db = new MongoMock(store)
  })

  describe('find', () => {
    test('should reject with error if missing db instance', () => (
      common.find(undefined, '1a', 'things').then((r) => {
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
      common.find(db, '1a', undefined).then((r) => {
        expect(r).not.toBeDefined()
      })
      .catch((err) => {
        expect(err).toBeDefined()
        expect(err.name).toBe('ValidationError')
      })
    ))

    test('should return one result if found', () => (
      common.find(db, '1a', 'things').then((r) => {
        expect(r).toBeDefined()
        expect(r).toBe(store.things[0])
      })
    ))

    test('should reject if not found', () => (
      common.find(db, '22', 'things').then((r) => {
        expect(r).not.toBeDefined()
      }).catch((err) => {
        expect(err).toBeDefined()
        expect(err.message).toBe('Record with id 22 not found')
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
