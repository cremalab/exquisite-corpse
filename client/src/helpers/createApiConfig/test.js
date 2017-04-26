import createApiConfig from './'

it('create api config', () => {
  const config  = {
    CORPSE_CREATE: {
      path: `/corpses`,
      method: 'POST',
    }
  }
  expect(createApiConfig(config)).toEqual({
    CORPSE_CREATE: {
      path: `/corpses`,
      method: 'POST',
      INITIAL: 'CORPSE_CREATE_INITIAL',
      SUCCESS: 'CORPSE_CREATE_SUCCESS',
      FAILURE: 'CORPSE_CREATE_FAILURE',
    }
  })
})
