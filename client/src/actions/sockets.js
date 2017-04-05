import Nes from 'nes'
import store from 'store'

function socket() {
  fetch('/nes/auth', {credentials: 'include'})
    .then(res => res.json())
    .then((res) => {
      const wsClient = new Nes.Client('ws://localhost:8000')
      wsClient.connect({ auth: res.token }, err => {
        if (err) { throw err }
        wsClient.subscribe('/lobby', handleLobbyMsg, handleError)
        wsClient.request({
          path: '/lobby',
          method: 'POST',
        }, (err, user) => {
          if (err) { throw err }
          store.dispatch({ type: 'SET_USER', payload: user })
        })
      })
    })
}

const handleLobbyMsg = ({ type, data }) => {
  console.log(type, data)
  switch (type) {
    case 'usersChange':
      break
    case 'corpseChange':
      return store.dispatch({ type: 'MERGE_CORPSE', payload: data })
    default:
      return null
  }
  // store.dispatch({ type: 'FOO', payload: {} })
}

function handleError() {

}
export default socket
