const helper = require('../../utils/testHelper')

describe('lobbyRoutes', () => {
  let server
  beforeAll(() => (
    helper.testServer().then((s) => { server = s })
    .then(() => server.mongo.db.collection('corpses').deleteMany({}))
    .then(() => server.mongo.db.collection('drawings').deleteMany({}))
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
          expect(response.result).toEqual(helper.session)
        })
    ))
  })

  describe('disconnect user', () => {
    test('returns a 200', () => {
      server.inject({
        method: 'DELETE',
        url: '/lobby',
        credentials: helper.session,
      })
        .then((result) => {
          expect(result.statusCode).toBe(200)
        })
    })
    test('returns array without user', () => (
      server.inject({
        method: 'DELETE',
        url: '/lobby',
        credentials: helper.session,
      })
        .then((response) => {
          expect(response.result.map(u => u.name))
            .not.toContain(helper.session.name)
        })
    ))
  })

  describe('chat message', () => {
    test('returns a 200', () => {
      server.inject({
        method: 'POST',
        url: '/lobby/chat',
        credentials: helper.session,
        payload: {
          content: `I love to talk!`,
        },
      })
        .then((result) => {
          expect(result.statusCode).toBe(201)
        })
    })
  })
})
