import { CALL_API } from 'redux-api-middleware'

export function loadDrawing(id) {
  return {
    [CALL_API]: {
      endpoint: `/drawings/${id}`,
      method: 'GET',
      types: ['REQUEST', 'SUCCESS_CORPSE', 'FAILURE'],
      credentials: 'include',
    },
  }
}
