const helper = require('../../utils/testHelper')

describe('lobbyRoutes', () => {
  let server
  beforeAll(() => (
    helper.testServer().then((s) => { server = s })
  ))
  afterAll(() => server.mongo.db.connection.close())

  test('guest auth', () => {
    return server.inject({
      method: 'POST',
      url: '/login/guest',
      payload: {
        name: 'Gus'
      }
    }).then((res) => {
      expect(res.headers.location).toEqual('/')
      expect(res.statusCode).toEqual(302)
    })
  })
})
