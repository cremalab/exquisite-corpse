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
import { CALL_API } from 'redux-api-middleware'

export function clearCorpse() {
  return {
    type: CLEAR_CORPSE,
  }
}
