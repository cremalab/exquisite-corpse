import Nes from 'nes';
import {MERGE_CORPSE} from 'config/actionTypes';

const success = payload => (dispatch, getState, { wsClient }) => {
  wsClient.connect({ auth: payload.token }, err => {
    if (err) { throw err }
    wsClient.subscribe('/lobby', handleLobbyMsg(dispatch), handleError)
    wsClient.request({
      path: '/lobby',
      method: 'POST',
    }, (err, user) => {
      if (err) { throw err }
      dispatch({ type: 'SET_USER', payload: user.credentials })
    })
  })
}

const initialize = () => (dispatch, getState, { request }) =>
  dispatch(request({ path: '/nes/auth'})({ success }))

const handleLobbyMsg = ({ type, data }) => dispatch => {
  switch (type) {
    case 'usersChange':
      break
    case 'corpseChange':
      return dispatch({ type: MERGE_CORPSE, payload: data })
    default:
      return null
  }
}

function handleError() {

}
export default initialize
