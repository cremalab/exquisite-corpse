import {
  CORPSES_SET,
  CORPSES_RESET,
  CORPSES_LOAD
} from 'config/constants'

const initialState = {
  loading: false,
  list: []
}

function corpses(state = initialState, action) {
  switch (action.type) {
    case CORPSES_SET:
      return {
        loading: false,
        list: action.payload
      }
    default:
      return state
  }
}

export default corpses;
