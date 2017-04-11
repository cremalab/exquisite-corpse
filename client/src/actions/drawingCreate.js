import { CALL_API } from 'redux-api-middleware'
import {push} from 'react-router-redux'
import {
  REQUEST_CREATE_DRAWING,
  SUCCESS_CREATE_DRAWING,
  FAILURE_DRAWING
} from 'config/actionTypes'

const initial = ()      => ({ type: REQUEST_CREATE_DRAWING })
const success = payload => dispatch => {
  dispatch({ type: SUCCESS_CREATE_DRAWING, payload })
  dispatch(push(`/drawing/${payload.result._id}`))
}
const fail    = ()      => ({ type: FAILURE_DRAWING })

const drawingCreate = section => (dispatch, getState, { request }) => dispatch(
  request({
    path: `/drawings`,
    method: 'POST',
    body: JSON.stringify({ section }),
  })({ initial, success, fail })
)

export default drawingCreate
