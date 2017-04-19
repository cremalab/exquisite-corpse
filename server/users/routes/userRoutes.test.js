const helper = require('../../utils/testHelper')

describe('userRoutes', () => {
  let server
  let db
  beforeAll(() => (
    helper.testServer().then((s) => { server = s; db = s.mongo.db }).then(() => (
      Promise.all([
        server.mongo.db.collection('corpses').deleteMany({}),
        server.mongo.db.collection('drawings').deleteMany({}),
        server.mongo.db.collection('drawings').insertMany([
          { creator: helper.session, section: '123', createdAt: '', updatedAt: '', status: 'incomplete' },
          { creator: helper.session, section: '124', createdAt: '', updatedAt: '', status: 'complete' },
          { creator: { id: '555', name: 'Norm', provider: 'Guest' },
            section: '124', createdAt: '', updatedAt: ''
          },
        ])
      ])
    ))
  ))
  afterAll(() => server.mongo.db.connection.close())

  describe('drawings', () => {
    test('should return array of drawings', () => (
      server.inject({
        method: 'GET',
        url: '/me/drawings',
        credentials: helper.session,
      })
      .then((res) => {
        expect(res.statusCode).toBe(200)
        expect(res.result.result).not.toBeUndefined()
        expect(Array.isArray(res.result.result)).toBe(true)
        res.result.result.map(d => expect(d.creator.id).toEqual(helper.session.id))
      })
    ))

    test('should filter by status', () => (
      server.inject({
        method: 'GET',
        url: '/me/drawings?status=incomplete',
        credentials: helper.session,
      })
      .then((res) => {
        expect(res.statusCode).toBe(200)
        expect(res.result.result).not.toBeUndefined()
        expect(Array.isArray(res.result.result)).toBe(true)
        expect(res.result.result.length).toBe(1)
      })
    ))
  })
})
