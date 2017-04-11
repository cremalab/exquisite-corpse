import { CALL_API } from 'redux-api-middleware'
import {push} from 'react-router-redux'
import {
  REQUEST_SAVE_DRAWING,
  SUCCESS_SAVE_DRAWING,
  FAILURE_DRAWING
} from 'config/actionTypes'

const initial = ()      => ({ type: REQUEST_SAVE_DRAWING })
const success = payload => ({ type: SUCCESS_SAVE_DRAWING, payload })
const fail    = ()      => ({ type: FAILURE_DRAWING })

const drawingSave = (drawingId, canvas) => (dispatch, getState, { request }) => dispatch(
  request({
    path: `/drawings/${drawingId}`,
    method: 'PUT',
    body: JSON.stringify({ canvas }),
  })({ initial, success, fail })
)

export default drawingSave
