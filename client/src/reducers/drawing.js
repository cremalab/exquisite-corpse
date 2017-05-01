import {
  SUCCESS_DRAWING,
  CLEAR_DRAWING,
  REMOVE_CORPSE,
  SUCCESS_SUBSCRIBE,
  FAILURE_SUBSCRIBE,
  DRAWING_EXPIRATION,
} from 'config/actionTypes'
import API from 'config/api'

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
    case API.DRAWING_LOAD.INITIAL:
      return {
        ...state,
        loading: true
      }

    case API.DRAWING_SAVE.INITIAL:
      return {...state, saving: true}

    case API.DRAWING_SAVE.SUCCESS:
      return {
        ...state,
        saving: false,
        result: action.payload.result
      }

    case API.DRAWING_LOAD.SUCCESS:
      return {
        ...state,
        loading: false,
        result: action.payload.result
      }

    case API.DRAWING_DESTROY.FAILURE:
      return {
        ...state,
        loading: false
      }

    case CLEAR_DRAWING:
      return initialState

    case API.CORPSE_DESTROY.SUCCESS:
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
