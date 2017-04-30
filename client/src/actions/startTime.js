import { TICK } from 'config/actionTypes'

const startTime = () => (dispatch) => {
  setInterval(() => {
    dispatch({ type: TICK, payload: new Date() })
  }, 1000)
}

export default startTime
