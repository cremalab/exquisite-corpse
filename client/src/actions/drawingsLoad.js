import {
  REQUEST_DRAWINGS, SUCCESS_DRAWINGS, FAILURE
} from 'config/actionTypes'

const initial = ()      => ({ type: REQUEST_DRAWINGS })
const success = payload => ({ type: SUCCESS_DRAWINGS, payload })
const fail    = ()      => ({ type: FAILURE })

const drawingsLoad = (status) => (dispatch, getState, { request }) => dispatch(
  request({ path: `/me/drawings${status ? `?status=${status}` : ''}`})({ initial, success, fail })
)

export default drawingsLoad
