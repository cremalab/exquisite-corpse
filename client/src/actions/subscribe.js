import {
  REQUEST_SUBSCRIBE,
  SUCCESS_SUBSCRIBE,
  FAILURE_SUBSCRIBE,
} from 'config/actionTypes'

const socketSubscribe = (channel) => (dispatch, getState, { wsClient }) => {

  dispatch({ type: REQUEST_SUBSCRIBE, payload: { channel } })

  const success = ({ type, data }) => {
    dispatch({ type, payload: data })
  }

  const failure = error => {
    if (error) return dispatch({ type: FAILURE_SUBSCRIBE, payload: error })
    dispatch({ type: SUCCESS_SUBSCRIBE, payload: { channel } })
  }
  
  wsClient.subscribe(channel, success, failure)
}

export default socketSubscribe
