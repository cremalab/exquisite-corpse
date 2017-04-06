const helper = require('../../utils/testHelper')

describe('userRoutes', () => {
  let server
  let db
  beforeAll(() => (
    helper.testServer().then((s) => { server = s; db = s.mongo.db }).then(() => (
      Promise.all([
        server.mongo.db.collection('corpses').deleteMany({}),
        server.mongo.db.collection('drawings').deleteMany({})
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
      })
    ))
  })
})
