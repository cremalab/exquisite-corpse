import {
  REQUEST_CORPSES,
  SUCCESS_CORPSES,
  SUCCESS_CORPSE_CREATE
} from 'config/actionTypes'

const initialState = {
  loading: false,
  result: []
}

function corpses(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CORPSES:
      return {
        ...state,
        loading: true
      }

    case SUCCESS_CORPSES:
      return {
        loading: false,
        result: action.payload.result
      }

    case SUCCESS_CORPSE_CREATE:
      return {
        ...state,
        result: [...state.result, action.payload.result]
      }
    default:
      return state
  }
}

export default corpses;
