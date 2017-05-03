import subscribe from 'actions/subscribe'
import {AUTH_INIT} from 'config/actionTypes'
import userLoad from './userLoad'

const initialize = () => (dispatch, getState, { wsClient }) => dispatch({
  type: AUTH_INIT,
  payload: {
    request:{
      url:'/nes/auth'
    },
  }
}).then(({ payload }) => {
  wsClient.connect({ auth: payload.data.token }, err => {
    if (err) { throw err }
    dispatch(subscribe(`/lobby`))
    dispatch(userLoad())
  })
})

export default initialize
