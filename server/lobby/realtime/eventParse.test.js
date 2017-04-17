const parser = require('./eventParser')
const eventTypes = require('./eventTypes')

describe('eventParser', () => {
  describe('DRAWING_STARTED', () => {
    const data = {
      credentials: {
        name: 'Ross',
        id: 1,
      },
      section: '123',
      corpse: {
        creator: { name: 'Bob', id: '20'},
        sections: [
          { _id: '123', description: 'Head' },
        ]
      },
    }
    test('should format message', () => {
      expect(parser.toMessage(eventTypes.DRAWING_STARTED, data).content)
      .toBe(`Ross started drawing Head for Bob's corpse`)
    })
    test('should return related data', () => {
      const related = parser.toMessage(eventTypes.DRAWING_STARTED, data).related
      const primary = related.find(r => r.primary)
      const actor = related.find(r => r.type === 'actor')
      expect(Array.isArray(related)).toBe(true)
      expect(primary.type).toBe('drawing')
      expect(actor.name).toBe('Ross')
    })
  })
})
