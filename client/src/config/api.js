import createApiConfig from 'helpers/createApiConfig'

export default createApiConfig({
  AUTH_INIT: {
    path: '/nes/auth',
    method: 'GET'
  },
  USER_LOAD: {
    path: '/lobby',
    method: 'POST',
  },
  CORPSE_CREATE: {
    path: `/corpses`,
    method: 'POST',
  },
  CORPSE_LOAD: {
    path: `/corpses/:id`,
    method: 'GET',
  },
  CORPSE_DESTROY: {
    path: `/corpses/:id`,
    method: 'DELETE',
  },
  CORPSES_LOAD: {
    path: '/corpses',
    method: 'GET',
  },
  CHAT_SEND: {
    path: `/lobby/chat`,
    method: 'POST',
  },
  DRAWING_DESTROY: {
    path: `/drawings/:id`,
    method: 'DELETE',
  },
  DRAWING_COMMIT: {
    path: `/drawings/:id/commit`,
    method: 'POST',
  },
  DRAWING_CREATE: {
    path: `/drawings`,
    method: 'POST',
  },
  DRAWING_LOAD: {
    path: `/drawings/:id`,
    method: 'GET'
  },
  DRAWING_SAVE: {
    path: `/drawings/:id`,
    method: 'PUT',
  },
  DRAWINGS_LOAD: {
    path: `/me/drawings`,
    method: 'GET'
  },
  CHAT_STATUS_CHANGE: {
    method: 'POST',
    path: `/lobby/status`,
  }
})
