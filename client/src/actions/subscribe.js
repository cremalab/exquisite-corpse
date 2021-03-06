import {
  REQUEST_SUBSCRIBE,
  SUCCESS_SUBSCRIBE,
  FAILURE_SUBSCRIBE,
  MERGE_CORPSE,
  USERS_CHANGE,
  USER_STATUS_CHANGE,
  CHAT_MESSAGE_ADD,
  REMOVE_CORPSE,
  LOBBY_EVENT,
  DRAWING_EXPIRATION,
} from 'config/actionTypes'

const handleEventMsg = (dispatch) => ({ type, data }) => {
  switch (type) {
    case 'corpseChange':
      if (data.removed) {
        return dispatch({ type: REMOVE_CORPSE, payload: data })
      }
      return dispatch({ type: MERGE_CORPSE, payload: data })
    case 'drawingExpiration':
      return dispatch({ type: DRAWING_EXPIRATION, payload: data })
    case 'usersChange':
      return dispatch({ type: USERS_CHANGE, payload: data })
    case 'chatMessage':
      return dispatch({ type: CHAT_MESSAGE_ADD, payload: data })
    case 'userStatusChange':
      return dispatch({ type: USER_STATUS_CHANGE, payload: data })
    case 'genericEvent':
      return dispatch({ type: LOBBY_EVENT, payload: data })
    default:
      return null
  }
}


const handleSub = (error, channel, dispatch) => {
  if (error) {
    return dispatch({ type: FAILURE_SUBSCRIBE, payload: error })
  }
  dispatch({ type: SUCCESS_SUBSCRIBE, payload: { channel } })
}

const socketSubscribe = (channel) => (dispatch, getState, { wsClient }) => {
  dispatch({ type: REQUEST_SUBSCRIBE, payload: { channel } })
  wsClient.subscribe(channel, handleEventMsg(dispatch), (err) => {
    return handleSub(err, channel, dispatch)
  })
}

export default socketSubscribe
