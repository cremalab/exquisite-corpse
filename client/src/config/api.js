import createApiConfig from 'helpers/createApiConfig'

export default createApiConfig({
  CORPSE_CREATE: {
    path: `/corpses`,
    method: 'POST',
  },
  CORPSE_LOAD: {
    path: `/corpses/:id`,
    method: 'GET',
  }
})
