import {
  REQUEST_DRAWING,
  REQUEST_SAVE_DRAWING,
  SUCCESS_SAVE_DRAWING,
  SUCCESS_DRAWING,
  FAILURE_DRAWING,
  CLEAR_DRAWING,
} from 'config/actionTypes'

const initialState = {
  loading: false,
  saving: false,
  result: {}
}

function corpses(state = initialState, action) {
  switch (action.type) {
    case REQUEST_DRAWING:
      return {
        ...state,
        loading: true
      }

    case REQUEST_SAVE_DRAWING:
      return {...state, saving: true}

    case SUCCESS_SAVE_DRAWING:
      return {
        ...state,
        saving: false,
        result: action.payload.result
      }

    case SUCCESS_DRAWING:
      return {
        ...state,
        loading: false,
        result: action.payload.result
      }

    case FAILURE_DRAWING:
      return {
        ...state,
        loading: false
      }

    case CLEAR_DRAWING:
      return initialState

    default:
      return state
  }
}

export default corpses
