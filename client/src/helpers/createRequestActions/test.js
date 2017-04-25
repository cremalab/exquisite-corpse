import createRequestActions from './'

const config  = {
  CORPSE_CREATE: {
    path: `/corpses`,
    method: 'POST',
  }
}
const request = createRequestActions(config)
const dispatch = () => ({})
window.fetch = jest.fn().mockImplementation(() => Promise.resolve());

it('creates fetch object from config', () => {
  return request.CORPSE_CREATE({})(dispatch).then(resp => {
    console.log('here', resp)
    expect(resp).toEqual({})
  })
})
