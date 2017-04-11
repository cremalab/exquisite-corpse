import {
  REQUEST_UNSUBSCRIBE,
  SUCCESS_UNSUBSCRIBE,
  FAILURE_UNSUBSCRIBE,
} from 'config/actionTypes'

const handleUnsubscribe = (dispatch) => error => {
  if (error) {
    return dispatch({ type: FAILURE_UNSUBSCRIBE, payload: error })
  }
  dispatch({ type: SUCCESS_UNSUBSCRIBE })
}

const socketUnsubscribe = (channel) => (dispatch, getState, { wsClient }) => {
  dispatch({ type: REQUEST_UNSUBSCRIBE, payload: { channel } })
  wsClient.unsubscribe(channel, null, handleUnsubscribe(dispatch))
}

export default socketUnsubscribe
