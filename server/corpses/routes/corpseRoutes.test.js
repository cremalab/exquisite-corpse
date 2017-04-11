const helper = require('../../utils/testHelper')
const corpsesDB = require('../db/corpsesDB')

describe('corpseRoutes', () => {
  let server
  let db
  beforeAll(() => (
    helper.testServer().then((s) => { server = s; db = s.mongo.db }).then(() => (
      server.mongo.db.collection('corpses').deleteMany({})
    ))
  ))
  afterAll(() => server.mongo.db.connection.close())

  describe('index', () => {
    test('should redirect if no auth', () => (
      server.inject({
        method: 'GET',
        url: '/corpses',
      })
      .then(res => res.statusCode)
      .then((code) => {
        expect(code).toBe(302)
      })
    ))
    test('should return array', () => (
      server.inject({
        method: 'GET',
        url: '/corpses',
        credentials: helper.session,
      })
      .then((res) => {
        expect(res.statusCode).toBe(200)
        expect(Array.isArray(res.result.result)).toBe(true)
      })
    ))
  })

  describe('show', () => {
    test('should return object', () => {
      let corpse
      corpsesDB.create(db, { creator: helper.session })
        .then((c) => {
          corpse = c
          return server.inject({
            method: 'GET',
            url: `/corpses/${corpse._id}`,
            credentials: helper.session,
          })
        })
        .then((res) => {
          expect(res.statusCode).toBe(200)
          expect(String(res.result.result._id)).toBe(String(corpse._id))
        })
    })
  })

  describe('create', () => {
    test(`should redirect if not auth'd`, () => (
      server.inject({
        method: 'POST',
        url: `/corpses`,
      })
      .then((res) => {
        expect(res.statusCode).toBe(302)
      })
    ))
    test(`should create a corpse for current user`, () => (
      server.inject({
        method: 'POST',
        url: `/corpses`,
        credentials: helper.session,
      })
      .then((res) => {
        expect(res.statusCode).toBe(201)
        expect(res.result.result).not.toBeUndefined()
        expect(res.result.result.creator).toMatchObject(helper.session)
      })
    ))

    test(`should create a with default sections if no params`, () => (
      server.inject({
        method: 'POST',
        url: `/corpses`,
        credentials: helper.session,
        payload: {},
      })
      .then((res) => {
        expect(res.result.result.sections.map(s => s.description))
          .toEqual(expect.arrayContaining(['Head', 'Torso', 'Legs', 'Feet']))
      })
    ))

    test(`should create corpse with defined sections`, () => (
      server.inject({
        method: 'POST',
        url: `/corpses`,
        credentials: helper.session,
        payload: {
          sections: [
            { description: 'Head', anchorPoints: [10, 190] },
            { description: 'Torso', anchorPoints: [30, 170] },
            { description: 'Legs', anchorPoints: [20, 180] },
            { description: 'Rollerblades' },
          ]
        }
      })
      .then((res) => {
        expect(res.statusCode).toEqual(201)
        const { sections } = res.result.result
        expect(sections.map(s => s.description))
          .toEqual(expect.arrayContaining(['Head', 'Torso', 'Legs', 'Rollerblades']))
        expect(sections.map(s => s.anchorPoints)).toEqual([
          { bottom: [10, 190], top: [] },
          { bottom: [30, 170], top: [10, 190] },
          { bottom: [20, 180], top: [30, 170] },
          { bottom: [], top: [20, 180] },
        ])
      })
    ))

    test(`can create many sections`, () => (
      server.inject({
        method: 'POST',
        url: `/corpses`,
        credentials: helper.session,
        payload: {
          sections: [
            { description: 'Head', anchorPoints: [10, 190] },
            { description: 'Neck', anchorPoints: [40, 160] },
            { description: 'Shoulders', anchorPoints: [40, 160] },
            { description: 'Chest', anchorPoints: [30, 170] },
            { description: 'Belly', anchorPoints: [30, 170] },
            { description: 'Thighs', anchorPoints: [20, 180] },
            { description: 'Knees', anchorPoints: [20, 180] },
            { description: 'Calves', anchorPoints: [20, 180] },
            { description: 'Shoes' },
          ]
        }
      })
      .then((res) => {
        expect(res.statusCode).toEqual(201)
        expect(res.result.result.sections.map(s => s.description))
          .toEqual(expect.arrayContaining([
            'Head', 'Neck', 'Shoulders', 'Chest', 'Belly', 'Thighs', 'Knees',
            'Calves', 'Shoes'
          ]))
      })
    ))
  })
})
