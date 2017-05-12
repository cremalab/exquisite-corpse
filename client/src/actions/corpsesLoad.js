import { SUCCESS_CORPSES, REQUEST_CORPSES, FAILURE } from 'config/actionTypes'

const initial = ()      => ({ type: REQUEST_CORPSES })
const success = payload => ({ type: SUCCESS_CORPSES, payload })
const fail    = ()      => ({ type: FAILURE })

const corpsesLoad = (page) => (dispatch, getState, { request }) => dispatch(
  request({ method: 'GET', path: `/corpses?page=${page || 1}`})({ initial, success, fail })
)

export default corpsesLoad
