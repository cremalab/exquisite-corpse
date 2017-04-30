import { TIME_UPDATE } from 'config/actionTypes'

const timeUpdate = dateNow => ({
  type: TIME_UPDATE,
  payload: dateNow
})

export default timeUpdate
