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
  console.log(type, data);
  store.dispatch({ type: 'FOO', payload: {} })
}

function handleError() {

}
export default socket;
