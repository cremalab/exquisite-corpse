import {
  REQUEST_SUBSCRIBE,
  SUCCESS_SUBSCRIBE,
  FAILURE_SUBSCRIBE,
  MERGE_CORPSE,
} from 'config/actionTypes'

const handleCorpseMsg = (dispatch) => ({ type, data }) => {
  switch (type) {
    case 'corpseChange':
      return dispatch({ type: MERGE_CORPSE, payload: data })
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
  wsClient.subscribe(channel, handleCorpseMsg(dispatch), handleSub)
}

export default socketSubscribe
