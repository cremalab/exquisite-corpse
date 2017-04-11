import subscribe from 'actions/subscribe'

const initialize = () => (dispatch, getState, { request }) =>
  dispatch(request({ path: '/nes/auth'})({ success }))

const success = payload => (dispatch, getState, { wsClient }) => {
  wsClient.connect({ auth: payload.token }, err => {
    if (err) { throw err }
    dispatch(subscribe(`/lobby`))
    wsClient.request({
      path: '/lobby',
      method: 'POST',
    }, (err, user) => {
      if (err) { throw err }
      dispatch({ type: 'SET_USER', payload: user.credentials })
    })
  })
}


export default initialize
