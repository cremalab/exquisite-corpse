const rt = require('./lobbyRT')

describe('lobbyRT', () => {
  describe('connectUser', () => {
    const publish = jest.fn()
    const server = {
      publish,
    }
    test('add payload to users array', () => {
      const payload = { credentials: { name: 'Ross', id: '1' }}
      expect(publish).not.toBeCalled()
      rt.connectUser(server, payload)
      const userObj = { id: '1', name: 'Ross', socketId: undefined, status: 'idle' }
      const expectedPayload = {
        data: [userObj],
        type: 'usersChange',
      }
      expect(publish).toBeCalledWith('/lobby', expectedPayload)
      expect(rt.users).toEqual(expect.arrayContaining([userObj]))
    })
  })
  describe('disconnectUser', () => {
    test('remove payload from users array', () => {
      const publish = jest.fn()
      const server = {
        publish,
      }
      rt.users = [{ name: 'Fred', id: '2', socketId: 1 }]
      expect(publish).not.toBeCalled()
      rt.disconnectUser(server, 1)
      const expectedPayload = {
        data: [],
        type: 'usersChange',
      }
      expect(publish).toBeCalledWith('/lobby', expectedPayload)
      expect(rt.users).toEqual(expect.arrayContaining([]))
    })
  })
  describe('notifyChatMessage', () => {
    test('should broadcast with payload', () => {
      const publish = jest.fn()
      const server = {
        publish,
      }
      const content = 'Hi everybody!'
      expect(publish).not.toBeCalled()
      rt.notifyChatMessage(server, { name: 'ross', id: 1 }, content)
      const expectedPayload = {
        data: {
          name: 'ross',
          id: 1,
          content,
          timestamp: new Date().toISOString(),
        },
        type: 'chatMessage',
      }
      expect(publish).toBeCalledWith('/lobby', expectedPayload)
    })
  })
})
