import {
  REQUEST_CORPSE,
  SUCCESS_CORPSE,
  FAILURE
} from 'config/actionTypes'

const initial = ()      => ({ type: REQUEST_CORPSE })
const success = payload => ({ type: SUCCESS_CORPSE, payload })
const fail    = ()      => ({ type: FAILURE })

const corpsesLoad = id => (dispatch, getState, { request }) => dispatch(
  request({ path: `/corpses/${id}`})({ initial, success, fail })
)

export default corpsesLoad
