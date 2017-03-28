import { push } from 'react-router-redux'
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

export function setDrawing(payload) {
  return (dispatch) => {
    dispatch({ type: 'DRAWING_SET', payload })
  }
}
