import {
  REQUEST_SUBSCRIBE,
  SUCCESS_SUBSCRIBE,
  FAILURE_SUBSCRIBE,
  MERGE_CORPSE,
  CHAT_MESSAGE_ADD,
} from 'config/actionTypes'

const handleEventMsg = (dispatch) => ({ type, data }) => {
  switch (type) {
    case 'corpseChange':
      return dispatch({ type: MERGE_CORPSE, payload: data })
    case 'chatMessage':
      return dispatch({ type: CHAT_MESSAGE_ADD, payload: data })
    default:
      return null
  }
}


const handleSub = (error) => dispatch => {
  if (error) {
    return dispatch({ type: FAILURE_SUBSCRIBE, payload: error })
  }
  dispatch({ type: SUCCESS_SUBSCRIBE })
}

const socketSubscribe = (channel) => (dispatch, getState, { wsClient }) => {
  dispatch({ type: REQUEST_SUBSCRIBE, payload: { channel } })
  wsClient.subscribe(channel, handleEventMsg(dispatch), handleSub)
}

export default socketSubscribe
