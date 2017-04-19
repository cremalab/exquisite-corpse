const testHelper = require('../../db/testHelper')
const CorpseCleaner = require('./CorpseCleaner')
const subHours = require('date-fns/sub_hours')
const subMinutes = require('date-fns/sub_minutes')

const now = new Date()
const momentsAgo = subMinutes(now, 15)
const hoursAgo = subHours(now, 4)
const longAgo = subHours(now, 72)

const corpses = [
  {
    _id: '112233445566',
    creator: { _id: '1' },
    status: 'new',
    sections: [
      { drawing: { _id: '123456789120' } }
    ]
  },
  {
    _id: '112233445567',
    creator: { _id: '1' },
    status: 'new',
    sections: [
      { drawing: { _id: '123456789121' } }
    ]
  },
  {
    _id: '123456789129',
    creator: { _id: '1' },
    status: 'new',
    sections: [
      { drawing: { _id: '123456789129' } }
    ]
  },
  {
    _id: '123456789121',
    creator: { _id: '1' },
    status: 'new',
    sections: [
      { drawing: { _id: '123456789122' } }
    ]
  },
  {
    _id: '123456789123',
    creator: { _id: '1' },
    status: 'new',
    sections: [
      { drawing: { _id: '123456789128' } }
    ]
  },
  {
    _id: '123456789124',
    creator: { _id: '1' },
    status: 'new',
    sections: [
      { drawing: { _id: '123456789124' } }
    ]
  },
]

const store = [
  {
    creator: {
      name: 'GUEST', id: '58cc21c72fbe8c108ba17fb8', provider: 'guest'
    },
    status: 'incomplete',
    _id: '123456789120',
    anchorPoints: { top: [10, 100], bottom: [40, 80] },
    corpse: corpses[0]._id,
    createdAt: longAgo,
  },
  {
    creator: {
      name: 'GUEST', id: '58cc21c72fbe8c108ba17fb8', provider: 'guest'
    },
    status: 'incomplete',
    _id: '123456789121',
    anchorPoints: { top: [10, 100], bottom: [40, 80] },
    corpse: corpses[1]._id,
    createdAt: momentsAgo,
  },
  {
    creator: {
      name: 'GUEST', id: '58cc21c72fbe8c108ba17fb8', provider: 'guest'
    },
    status: 'incomplete',
    _id: '123456789129',
    anchorPoints: { top: [10, 100], bottom: [40, 80] },
    corpse: corpses[2]._id,
    createdAt: hoursAgo,
  },
  {
    creator: {
      name: 'Slacker', id: '58cc21c72fbe8c108ba17fb4', provider: 'slack'
    },
    status: 'complete',
    _id: '123456789122',
    anchorPoints: { top: [10, 80], bottom: [10, 110] },
    corpse: corpses[3]._id,
    createdAt: longAgo,
  },
  {
    creator: {
      name: 'Slacker', id: '58cc21c72fbe8c108ba17fb4', provider: 'slack'
    },
    status: 'incomplete',
    _id: '123456789128',
    anchorPoints: { top: [10, 80], bottom: [10, 110] },
    corpse: corpses[4]._id,
    createdAt: longAgo,
  },
  {
    creator: {
      name: 'Slacker', id: '58cc21c72fbe8c108ba17fb4', provider: 'slack'
    },
    status: 'complete',
    _id: '123456789124',
    anchorPoints: { top: [10, 80], bottom: [10, 110] },
    corpse: corpses[5]._id,
    createdAt: hoursAgo,
  },
]

describe('CorpseCleaner', () => {
  let cleaner
  let db
  beforeAll(() => (
    testHelper.connectDB().then((database) => {
      db = database
      cleaner = new CorpseCleaner(db)
      return Promise.all([
        db.collection('drawings').deleteMany({}),
        db.collection('corpses').deleteMany({}),
        db.collection('corpses').insertMany(corpses),
        db.collection('drawings').insertMany(store),
      ])
    })
  ))
  afterAll(() => {
    return Promise.all([
      db.collection('drawings').deleteMany({}),
      db.close(),
    ])
  })

  describe('findOldest', () => {
    test('should return old incomplete', () => {
      return cleaner.findOldest().then((results) => {
        expect(Array.isArray(results)).toBe(true)
        expect(results.length).toBe(2)
        const ids = results.map(r => r._id)
        expect(ids).toContain('123456789120')
        expect(ids).toContain('123456789128')
      })
    })
  })
  describe('findGuest', () => {
    test('should return old incomplete drawings by guests', () => {
      return cleaner.findGuest().then((results) => {
        expect(Array.isArray(results)).toBe(true)
        expect(results.length).toBe(2)
        const ids = results.map(r => r._id)
        expect(ids).toContain('123456789120')
      })
    })
  })
  describe('clean', () => {
    test('should remove drawing from corpse, corpse from drawing', () => {
      return cleaner.clean().then((results) => {
        expect(Array.isArray(results)).toBe(true)

        return db.collection('drawings').find({_id: {$in: results.map(d => d._id)}})
          .toArray()
          .then((drawings) => {
            expect(drawings.map(d => d.corpse).filter(c => c).length).toBe(0)
            expect(drawings.map(d => d.status).filter(s => s !== 'expired').length).toBe(0)
            return
          })
          .then(() => (
            db.collection('corpses').find({_id: {$in: results.map(d => d.corpse)}})
              .toArray()
              .then((corpses) => {
                expect(corpses.map(d => d.drawing).filter(d => d).length).toBe(0)
              })
          ))
      })
    })
  })
})
