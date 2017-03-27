const helper = require('../../utils/testHelper')

describe('lobbyRoutes', () => {
  let server
  beforeAll(() => (
    helper.testServer().then((s) => { server = s; db = s.mongo.db })
  ))
  afterAll(() => server.mongo.db.connection.close())

  describe('index', () => {
    test('should redirect if no auth', () => (
      server.inject({
        method: 'GET',
        url: `/`,
      })
      .then(res => res.statusCode)
      .then((code) => {
        expect(code).toBe(302)
      })
    ))
    test('should return users and corpses', () => (
      server.inject({
        method: 'GET',
        url: `/lobby`,
        credentials: helper.session,
      })
      .then((res) => {
        expect(res.statusCode).toBe(200)
        expect(res.result).toHaveProperty('users')
        expect(res.result).toHaveProperty('corpses')
      })
    ))
  })

  describe('connect user', () => {
    test('returns a 200', () => {
      server.inject({
        method: 'POST',
        url: '/lobby',
        credentials: helper.session,
      })
        .then((result) => {
          expect(result.statusCode).toBe(200)
        })
    })
    test('returns user in array', () => (
      server.inject({
        method: 'POST',
        url: '/lobby',
        credentials: helper.session,
      })
        .then((response) => {
          expect(response.result.map(u => u.name))
            .toContain(helper.session.profile.user)
        })
    ))
  })
})
