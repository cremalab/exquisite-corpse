import * as actionTypes from 'config/actionTypes'
import { CALL_API } from 'redux-api-middleware'

export function loadCorpses() {
  return {
    [CALL_API]: {
      endpoint: '/corpses',
      method: 'GET',
      types: [
        actionTypes.REQUEST_CORPSES,
        actionTypes.SUCCESS_CORPSES,
        actionTypes.FAILURE
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
        actionTypes.REQUEST_CORPSE,
        actionTypes.SUCCESS_CORPSE,
        actionTypes.FAILURE
      ],
      credentials: 'include',
    },
  }
}

export function createCorpse() {
  return {
    [CALL_API]: {
      endpoint: '/corpses',
      method: 'POST',
      types: [
        actionTypes.REQUEST_CORPSE_CREATE,
        actionTypes.SUCCESS_CORPSE_CREATE,
        actionTypes.FAILURE
      ],
      credentials: 'include',
    },
  }
}
