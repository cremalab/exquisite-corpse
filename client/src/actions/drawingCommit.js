import {push} from 'react-router-redux'
import {
  REQUEST_COMMIT_DRAWING,
  SUCCESS_COMMIT_DRAWING,
  FAILURE_DRAWING
} from 'config/actionTypes'

const initial = ()      => ({ type: REQUEST_COMMIT_DRAWING })
const success = payload => dispatch => {
  dispatch(({ type: SUCCESS_COMMIT_DRAWING, payload }))
  if (payload.result.status === 'complete') {
    dispatch(push(`/corpse/${payload.result._id}`))
  } else {
    dispatch(push(`/`))
  }
}
const fail    = ()      => ({ type: FAILURE_DRAWING })

const drawingCommit = drawingId => (dispatch, getState, { request }) => dispatch(
  request({
    path: `/drawings/${drawingId}/commit`,
    method: 'POST',
  })({ initial, success, fail })
)

export default drawingCommit
