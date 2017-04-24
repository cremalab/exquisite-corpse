import { push } from 'react-router-redux'
import { DRAWING } from 'config/resourceTypes'
import {
  requestInitial,
  requestSuccess,
  requestFailure
} from 'actions/request'

const initial = requestInitial(DRAWING)
const success = payload => dispatch => {
  dispatch(requestSuccess(DRAWING)(payload))
  if(payload.result)
    dispatch(push(`/drawing/${payload.result._id}`))
}
const fail = requestFailure(DRAWING)

const drawingCreate = section => (dispatch, getState, { request }) => dispatch(
  request({
    path: `/drawings`,
    method: 'POST',
    body: JSON.stringify({ section }),
  })({ initial, success, fail })
)

export default drawingCreate
