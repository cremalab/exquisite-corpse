import {
  REQUEST_DRAWING,
  REQUEST_SAVE_DRAWING,
  SUCCESS_SAVE_DRAWING,
  SUCCESS_DRAWING,
  FAILURE_DRAWING,
  CLEAR_DRAWING,
  REMOVE_CORPSE,
  SUCCESS_SUBSCRIBE,
  FAILURE_SUBSCRIBE,
  DRAWING_EXPIRATION,
} from 'config/actionTypes'

const initialState = {
  loading: false,
  saving: false,
  result: {
    drawer: {
      provider: null
    }
  },
  corpseSubscribed: false,
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

    case REMOVE_CORPSE:
      if (action.payload._id !== state.result.corpse) return state
      var newResult = Object.assign({}, state.result)
      delete newResult.corpse
      return {
        ...state,
        result: newResult
      }

    case DRAWING_EXPIRATION:
      if (state.result._id !== action.payload._id) { return state }
      var modified = Object.assign({}, state.result)
      delete modified.corpse
      delete modified.section
      modified.status = 'expired'
      return {...state, result: modified}

    case SUCCESS_SUBSCRIBE:
      if (!state.result.corpse) return state
      if (action.payload.channel === `/corpses/${state.result.corpse}`) {
        return {...state, corpseSubscribed: true}
      }
      return state
    case FAILURE_SUBSCRIBE:
      return {...state, corpseSubscribed: false}

    default:
      return state
  }
}

export default corpses
