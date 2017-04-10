import {
  REQUEST_DRAWING, SUCCESS_DRAWING, FAILURE
} from 'config/actionTypes'
import { CALL_API } from 'redux-api-middleware'

const initial = ()      => ({ type: REQUEST_DRAWING })
const success = payload => ({ type: SUCCESS_DRAWING, payload })
const fail    = ()      => ({ type: FAILURE })

const drawingLoad = id => (dispatch, getState, { request }) => dispatch(
  request({ path: `/drawings/${id}`})({ initial, success, fail })
)

export default drawingLoad
