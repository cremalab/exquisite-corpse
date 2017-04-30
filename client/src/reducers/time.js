import {
  TICK,
} from 'config/actionTypes'

const initialState = {
  lastTick: new Date(),
}

function time(state = initialState, action) {
  switch (action.type) {
    case TICK:
      return {...state, lastTick: new Date()}
    default:
      return state
  }
}

export default time
