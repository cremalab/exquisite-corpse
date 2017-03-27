const helper = require('../../utils/testHelper')
const corpsesDB = require('../../corpses/db/corpsesDB')
const drawingsDB = require('../../drawings/db/drawingsDB')

describe('corpseDrawingRoutes', () => {
  let server
  let db
  let corpse
  let drawing
  beforeAll(() => (
    helper.testServer().then((s) => { server = s; db = s.mongo.db }).then(() => (
      Promise.all([
        server.mongo.db.collection('drawings').deleteMany({}),
        server.mongo.db.collection('corpses').deleteMany({}),
      ])
    ))
    .then(() => corpsesDB.create(db, { creator: helper.session }))
    .then((c) => { corpse = c })
    .then(() => drawingsDB.create(db, {
      section: corpse.sections[0]._id,
      creator: helper.session,
    }))
    .then((d) => { drawing = d })
  ))
  afterAll(() => server.mongo.db.connection.close())

  describe('create', () => {
    test('should redirect if no auth', () => (
      server.inject({
        method: 'POST',
        url: `/corpses/${corpse._id}/drawings`,
      })
      .then(res => res.statusCode)
      .then((code) => {
        expect(code).toBe(302)
      })
    ))

    test('should require drawing id', () => (
      server.inject({
        method: 'POST',
        url: `/corpses/${corpse._id}/drawings`,
        credentials: helper.session,
        payload: {}
      })
      .then((res) => {
        expect(res.statusCode).toBe(400)
        expect(res.result.validation).not.toBeUndefined()
        expect(res.result.validation.keys).toContain('drawing')
      })
    ))

    test('should copy return corpse', () => (
      server.inject({
        method: 'POST',
        url: `/corpses/${corpse._id}/drawings`,
        credentials: helper.session,
        payload: { drawing: drawing._id },
      })
      .then((res) => {
        console.log(res.result);
        expect(res.statusCode).toBe(200)
        expect(res.result.result.sections).not.toBeUndefined()
      })
    ))
  })
})
