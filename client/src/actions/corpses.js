import { CALL_API, getJSON } from 'redux-api-middleware'
import {push} from 'react-router-redux'
import {
  REQUEST_CORPSES,
  SUCCESS_CORPSES,
  REQUEST_CORPSE,
  SUCCESS_CORPSE,
  FAILURE,
  REQUEST_CORPSE_CREATE,
  SUCCESS_CORPSE_CREATE,
  CLEAR_CORPSE,
} from 'config/actionTypes'

export function loadCorpses() {
  return {
    [CALL_API]: {
      endpoint: '/corpses',
      method: 'GET',
      types: [
        REQUEST_CORPSES,
        SUCCESS_CORPSES,
        FAILURE
      ],
      credentials: 'include',
    },
  }
}

export function loadCorpse(id) {
  return {
    [CALL_API]: {
      endpoint: `/corpses/${id}`, // 58cc32a4bbf3b742adf1bbb8'
      method: 'GET',
      types: [
        REQUEST_CORPSE,
        SUCCESS_CORPSE,
        FAILURE
      ],
      credentials: 'include',
    },
  }
}

export function createCorpse() {
  return (dispatch) => dispatch({
    [CALL_API]: {
      endpoint: '/corpses',
      method: 'POST',
      types: [
        REQUEST_CORPSE_CREATE,
        SUCCESS_CORPSE_CREATE,
        FAILURE,
      ],
      credentials: 'include',
    },
  }).then(({ payload }) => {
    dispatch(push(`/corpse/${payload.result._id}`))
    dispatch({ type: 'SUCCESS_CORPSE_CREATE', payload })
  })
}

export function clearCorpse() {
  return {
    type: CLEAR_CORPSE,
  }
}
