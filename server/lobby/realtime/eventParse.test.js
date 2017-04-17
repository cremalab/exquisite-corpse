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
  describe('DRAWING_CANCELLED', () => {
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
      expect(parser.toMessage(eventTypes.DRAWING_CANCELLED, data).content)
      .toBe(`Ross quit drawing Head for Bob's corpse`)
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
  describe('DRAWING_COMPLETED', () => {
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
      expect(parser.toMessage(eventTypes.DRAWING_COMPLETED, data).content)
      .toBe(`Ross finished drawing Head for Bob's corpse`)
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
  describe('CORPSE_CREATED', () => {
    const data = {
      credentials: {
        name: 'Ross',
        id: 1,
      },
      corpse: {
        creator: { name: 'Bob', id: '20'},
        sections: [
          { _id: '123', description: 'Head' },
        ]
      },
    }
    test('should format message', () => {
      expect(parser.toMessage(eventTypes.CORPSE_CREATED, data).content)
      .toBe(`Ross created a new corpse`)
    })
    test('should return related data', () => {
      const related = parser.toMessage(eventTypes.CORPSE_CREATED, data).related
      const primary = related.find(r => r.primary)
      const actor = related.find(r => r.type === 'actor')
      expect(Array.isArray(related)).toBe(true)
      expect(primary.type).toBe('corpse')
      expect(actor.name).toBe('Ross')
    })
  })

  describe('CORPSE_COMPLETED', () => {
    const data = {
      credentials: {
        name: 'Ross',
        id: 1,
      },
      corpse: {
        creator: { name: 'Bob', id: '20'},
        sections: [
          { _id: '123', description: 'Head' },
        ]
      },
    }
    test('should format message', () => {
      expect(parser.toMessage(eventTypes.CORPSE_COMPLETED, data).content)
      .toBe(`Bob's corpse has been completed!`)
    })
    test('should return related data', () => {
      const related = parser.toMessage(eventTypes.CORPSE_COMPLETED, data).related
      const primary = related.find(r => r.primary)
      const actor = related.find(r => r.type === 'actor')
      expect(Array.isArray(related)).toBe(true)
      expect(primary.type).toBe('corpse')
      expect(actor.name).toBe('Ross')
    })
  })

})
