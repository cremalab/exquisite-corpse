const rt = require('./corpsesRT')

const publish = jest.fn()

const server = {
  publish,
}

describe('corpsesRT', () => {
  describe('notifyChange', () => {
    test('should publish event with url and payload', () => {
      const payload = { changed: true, _id: '1234' }
      expect(publish).not.toBeCalled()
      rt.notifyChange(server, payload)
      expect(publish).toBeCalledWith('/corpses/1234', payload)
    })
  })
})
