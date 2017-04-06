import {
  REQUEST_CORPSES,
  SUCCESS_CORPSES,
  REQUEST_CORPSE,
  SUCCESS_CORPSE,
  FAILURE,
  REQUEST_CORPSE_CREATE,
  SUCCESS_CORPSE_CREATE,
} from 'config/actionTypes'
import { CALL_API } from 'redux-api-middleware'

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
  return {
    [CALL_API]: {
      endpoint: '/corpses',
      method: 'POST',
      types: [
        REQUEST_CORPSE_CREATE,
        SUCCESS_CORPSE_CREATE,
        FAILURE
      ],
      credentials: 'include',
    },
  }
}
