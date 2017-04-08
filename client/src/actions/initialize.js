import Nes from 'nes';
import {MERGE_CORPSE} from 'config/actionTypes';

const initialize = () => (dispatch, getState, { wsClient }) => {
  fetch('/nes/auth', {credentials: 'include'})
    .then(res => res.json())
    .then((res) => {
      wsClient.connect({ auth: res.token }, err => {
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
    })
}

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
