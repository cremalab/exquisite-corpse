import Nes from 'nes'
import store from 'store'

function socket() {
  fetch('/nes/auth', {credentials: 'include'}).then((res) => {
    const wsClient = new Nes.Client('ws://localhost:8000')
    wsClient.connect(err => {
      if (err) { throw err }
      wsClient.subscribe('/lobby', handleLobbyMsg, handleError)
    })
  })
}

const handleLobbyMsg = ({ type, data }) => {
  store.dispatch({ type: `nes/${type}`, payload: data })
}

function handleError() {

}
export default socket;
