import { CALL_API, getJSON } from 'redux-api-middleware'
import {push} from 'react-router-redux'

export function loadCorpses() {
  return {
    [CALL_API]: {
      endpoint: '/corpses',
      method: 'GET',
      types: ['REQUEST_CORPSES', 'SUCCESS_CORPSES', 'FAILURE'],
      credentials: 'include',
    },
  }
}

export function loadCorpse(id) {
  return {
    [CALL_API]: {
      endpoint: `/corpses/${id}`, // 58cc32a4bbf3b742adf1bbb8'
      method: 'GET',
      types: ['REQUEST_CORPSE', 'SUCCESS_CORPSE', 'FAILURE'],
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
        'REQUEST_CORPSE_CREATE',
        {
          type: 'SUCCESS_CORPSE_CREATE_REDIRECT',
          payload: (action, state, res) => {
            return getJSON(res).then(payload => {
              dispatch(push(`/corpse/${payload.result._id}`))
              dispatch({ type: 'SUCCESS_CORPSE_CREATE', payload })
            });
          }
        },
        'FAILURE'
      ],
      credentials: 'include',
    },
  })
}
