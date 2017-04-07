const helper = require('../../utils/testHelper')

describe('authRoutes', () => {
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
    })
    .then((res) => {
      expect(res.headers.location).toEqual('/')
      expect(res.statusCode).toEqual(302)
    })
  })

  test('anonymous auth should set name to anonymous', () => {
    return server.inject({
      method: 'POST',
      url: '/login/guest',
      payload: {}
    })
    .then((res) => {
      expect(res.headers.location).toEqual('/')
      expect(res.statusCode).toEqual(302)
      const header = res.headers['set-cookie']
      expect(header.length).toEqual(1)
      const cookie = header[0].match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/)
      return server.inject({
        method: 'GET',
        url: '/me',
        payload: {},
        headers: { cookie: 'exquisite-auth=' + cookie[1] }
      })
    })
    .then((res) => {
      expect(res.request.auth.isAuthenticated).toBe(true)
      expect(res.request.auth.credentials.name).toBe('anonymous')
    })
  })
})
