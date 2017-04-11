import {
  REQUEST_CORPSE_CREATE,
  SUCCESS_CORPSE_CREATE,
  FAILURE,
} from 'config/actionTypes'

const initial = ()      => ({ type: REQUEST_CORPSE_CREATE })
const success = payload => ({ type: SUCCESS_CORPSE_CREATE, payload })
const fail    = ()      => ({ type: FAILURE })

const corpsesCreate = id => (dispatch, getState, { request }) => dispatch(
  request({ path: `/corpses`, method: 'POST' })({ initial, success, fail })
)

export default corpsesCreate
