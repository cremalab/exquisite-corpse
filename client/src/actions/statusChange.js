import {
  REQUEST_STATUS_CHANGE,
  USER_STATUS_CHANGE,
  FAILURE,
} from 'config/actionTypes'

const urlPrefix = `/lobby/status`

const statusChange = (status) => (dispatch, getState, { wsClient }) => {
  console.log(REQUEST_STATUS_CHANGE, USER_STATUS_CHANGE, FAILURE)
  dispatch({ type: REQUEST_STATUS_CHANGE, payload: { status } })
  wsClient.request({
    method: 'POST',
    path: urlPrefix,
    payload: { status }
  }, (err, res) => {
    if (err) { return dispatch({ type: FAILURE, payload: err })}
    dispatch({ type: USER_STATUS_CHANGE, payload: res })
  })
}

export default statusChange
