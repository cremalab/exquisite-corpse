import { SUCCESS_CORPSES, REQUEST_CORPSES, FAILURE } from 'config/actionTypes'
import { CALL_API } from 'redux-api-middleware'

const initial = ()      => ({ type: REQUEST_CORPSES })
const success = payload => ({ type: SUCCESS_CORPSES, payload })
const fail    = ()      => ({ type: FAILURE })

const corpsesLoad = () => (dispatch, getState, { request }) => dispatch(
  request({ method: 'GET', path: '/corpses'})({ initial, success, fail })
)

export default corpsesLoad
