import {
  CLEAR_DRAWING,
  CORPSE_CHANGE,
  SUCCESS_SUBSCRIBE,
  FAILURE_SUBSCRIBE,
  DRAWING_EXPIRATION,
  CORPSE_DESTROY,
  SUCCESS,
  FAILURE,
  DRAWING_DESTROY,
  DRAWING_SAVE,
  DRAWING_LOAD,
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

  const removeCorpse = () => {
    if (action.payload._id !== state.result.corpse) return state
    var newResult = Object.assign({}, state.result)
    delete newResult.corpse
    return {
      ...state,
      result: newResult
    }
  }

  switch (action.type) {
    case DRAWING_LOAD:
      return {
        ...state,
        loading: true
      }

    case DRAWING_SAVE:
      return {...state, saving: true}

    case `${DRAWING_SAVE}_${SUCCESS}`:
      return {
        ...state,
        saving: false,
        result: action.payload.data.result
      }

    case `${DRAWING_LOAD}_${SUCCESS}`:
      return {
        ...state,
        loading: false,
        result: action.payload.data.result
      }

    case `${DRAWING_DESTROY}_${FAILURE}`:
      return {
        ...state,
        loading: false
      }

    case CLEAR_DRAWING:
      return initialState

    case CORPSE_CHANGE:
      if ( action.payload.removed )
        return removeCorpse()

      return state

    case `${CORPSE_DESTROY}_${SUCCESS}`:
      return removeCorpse()

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
