const helper = require('../../utils/testHelper')
const corpsesDB = require('../../corpses/db/corpsesDB')
const drawingsDB = require('../../drawings/db/drawingsDB')
const combinerTest = require('../lib/canvasCombiner.test')

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
        url: `/drawings/${drawing._id}/commit`,
      })
      .then(res => res.statusCode)
      .then((code) => {
        expect(code).toBe(302)
      })
    ))

    test('should copy return corpse', () => (
      server.inject({
        method: 'POST',
        url: `/drawings/${drawing._id}/commit`,
        credentials: helper.session,
        payload: { drawing: drawing._id },
      })
      .then((res) => {
        expect(res.statusCode).toBe(200)
        expect(res.result.result.sections).not.toBeUndefined()
      })
    ))

    test('should set drawing status to complete', () => (
      server.inject({
        method: 'POST',
        url: `/drawings/${drawing._id}/commit`,
        credentials: helper.session,
        payload: { drawing: drawing._id },
      })
      .then((res) => {
        expect(res.statusCode).toBe(200)
        return drawingsDB.find(db, drawing._id).then((d) => {
          expect(d.status).toBe('complete')
        })
      })
    ))

    test('should stitch together canvases when complete', () => {
      // complete all drawings but last
      return Promise.all(corpse.sections.map((section, i) => {
        return drawingsDB.create(db, {
          section: section._id,
          creator: helper.session,
          canvas: combinerTest.exampleLayers[i],
        })
      }))
      .then((drawings) => {
        return Promise.all(corpse.sections.map((section, i) => {
          return server.inject({
            method: 'POST',
            url: `/drawings/${drawing._id}/commit`,
            credentials: helper.session,
          })
        }))
      })
      .then((results) => {
        const last = results[results.length - 1]
        expect(last.statusCode).toBe(200)
        expect(last.result.result.canvas).not.toBeUndefined()
      })
    })
  })
})
