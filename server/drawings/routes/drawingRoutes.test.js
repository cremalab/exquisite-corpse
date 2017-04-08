const helper = require('../../utils/testHelper')
const corpsesDB = require('../../corpses/db/corpsesDB')
const drawingsDB = require('../../drawings/db/drawingsDB')

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
      .then((res) => {
        expect(res.statusCode).toBe(302)
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
          canvas: `['Layer': []]`,
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

  describe('destroy', () => {
    test('should delete drawing', () => {
      let drawId
      return db.collection('drawings').insertOne({
        canvas: `['Layer': []]`,
        section: corpse.sections[0]._id,
      }).then((drawing) => {
        drawId = drawing.insertedId
        return server.inject({
          method: 'DELETE',
          url: `/drawings/${drawId}`,
          credentials: helper.session,
        })
      })
      .then((res) => {
        expect(res.statusCode).toBe(200)
        return drawingsDB.find(db, drawId).catch((err) => {
          expect(err).not.toBeUndefined()
          expect(err.output.statusCode).toEqual(404)
        })
      })
      .catch((err) => console.log(err))
    })

    test('should remove drawing and drawer from corpse', () => {
      let drawId
      return db.collection('drawings').insertOne({
        canvas: `['Layer': []]`,
        section: corpse.sections[0]._id,
      }).then((drawing) => {
        drawId = drawing.insertedId
        return server.inject({
          method: 'DELETE',
          url: `/drawings/${drawId}`,
          credentials: helper.session,
        })
      })
      .then((res) => {
        expect(res.statusCode).toBe(200)
        return corpsesDB.find(db, corpse._id).then((c) => {
          expect(c.sections[0].drawer).toBeUndefined()
          expect(c.sections[0].drawing).toBeUndefined()
        })
      })
      .catch((err) => console.log(err))
    })
  })
})
