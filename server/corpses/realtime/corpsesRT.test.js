const rt = require('./corpsesRT')

describe('corpsesRT', () => {
  describe('notifyChange', () => {
    const publish = jest.fn()
    const server = { publish }
    test('should publish event with url and payload', () => {
      const payload = { changed: true, _id: '1234' }
      expect(publish).not.toBeCalled()
      rt.notifyChange(server, payload)
      expect(publish).toBeCalledWith('/corpses/1234', {
        data: payload,
        type: 'change',
      })
    })
  })

  describe('notifyCompletion', () => {
    test('should publish event type and data', () => {
      const publish = jest.fn()
      const server = { publish }

      const payload = { changed: true, _id: '1234' }
      expect(publish).not.toBeCalled()
      rt.notifyCompletion(server, payload)
      expect(publish).toBeCalledWith('/corpses/1234', {
        data: payload,
        type: 'completion',
      })
    })
  })
})
