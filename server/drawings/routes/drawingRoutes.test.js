const helper = require('../../utils/testHelper')
const corpsesDB = require('../../corpses/db/corpsesDB')

describe('drawingRoutes', () => {
  let server
  let db
  let corpse
  beforeAll(() => (
    helper.testServer().then((s) => { server = s; db = s.mongo.db }).then(() => (
      server.mongo.db.collection('drawings').deleteMany({})
    ))
    .then(() => corpsesDB.create(db, { creator: helper.session }))
    .then((c) => { corpse = c })
  ))
  afterAll(() => server.mongo.db.connection.close())

  describe('create', () => {
    test('should redirect if no auth', () => (
      server.inject({
        method: 'POST',
        url: '/drawings',
      })
      .then(res => res.statusCode)
      .then((code) => {
        expect(code).toBe(302)
      })
    ))
    test('should require payload', () => (
      server.inject({
        method: 'POST',
        url: '/drawings',
        credentials: helper.session,
      })
      .then((res) => {
        expect(res.statusCode).toBe(400)
        expect(res.result.validation).not.toBeUndefined()
      })
    ))

    test('should create a drawing', () => (
      server.inject({
        method: 'POST',
        url: '/drawings',
        credentials: helper.session,
        payload: {
          canvas: {},
          section: corpse.sections[0]._id,
        },
      })
      .then((res) => {
        expect(res.statusCode).toBe(201)
        expect(res.result.result._id).not.toBeUndefined()
        expect(String(res.result.result.section)).toBe(String(corpse.sections[0]._id))
      })
    ))
  })
})
