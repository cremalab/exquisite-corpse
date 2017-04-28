import subscribe from 'actions/subscribe'

const initialize = () => (dispatch, getState, { api }) =>
  dispatch(api.AUTH_INIT({ actions: { SUCCESS } }))

const SUCCESS = payload => (dispatch, getState, { wsClient, api }) => {
  wsClient.connect({ auth: payload.token }, err => {
    if (err) { throw err }
    dispatch(subscribe(`/lobby`))
    dispatch(api.USER_LOAD())
  })
}


export default initialize
