import {push} from 'react-router-redux'
import {
  REQUEST_CANCEL_DRAWING,
  SUCCESS_CANCEL_DRAWING,
  FAILURE_DRAWING
} from 'config/actionTypes'

const initial = ()      => ({ type: REQUEST_CANCEL_DRAWING })
const success = payload => dispatch => {
  dispatch(({ type: SUCCESS_CANCEL_DRAWING, payload }))
  dispatch(push(`/`))
}
const fail    = ()      => ({ type: FAILURE_DRAWING })

const drawingCancel = drawingId => (dispatch, getState, { request }) => dispatch(
  request({
    path: `/drawings/${drawingId}`,
    method: 'DELETE',
  })({ initial, success, fail })
)

export default drawingCancel
