import {
  REQUEST_CORPSES,
  SUCCESS_CORPSES,
  SUCCESS_CORPSE_CREATE,
  MERGE_CORPSE,
  REMOVE_CORPSE,
  DRAWING_EXPIRATION,
} from 'config/actionTypes'

const initialState = {
  loading: false,
  result: [],
}

function updateObjectInArray(array, corpse) {
  if (array.find(item => item._id === corpse._id)) {
    return array.map((item) => {
      if (item._id !== corpse._id) {
        return item
      }
      return {
        ...item,
        ...corpse,
      }
    })
  }

  return [...array, corpse]
}

function corpses(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CORPSES:
      return {
        ...state,
        loading: true,
      }

    case SUCCESS_CORPSES:
      return {
        loading: false,
        result: action.payload.result,
      }

    case SUCCESS_CORPSE_CREATE:
      return {
        ...state,
        result: updateObjectInArray(state.result, action.payload.result),
      }
    case MERGE_CORPSE:
      return {
        ...state,
        result: updateObjectInArray(state.result, action.payload),
      }
    case REMOVE_CORPSE:
      return {
        ...state,
        result: state.result.filter(c => c._id !== action.payload._id),
      }
    case DRAWING_EXPIRATION:
      var corpse = state.result.find(c => c._id === action.payload.corpse)
      if (!corpse) return state
      var newCorpse = Object.assign({}, corpse)
      var section = corpse.sections.find(s => s.drawing._id === action.payload._id)
      var newSection = Object.assign({}, section)
      delete newSection.drawing
      delete newSection.drawer
      newCorpse.sections = newCorpse.sections.map((item) => {
        if (item._id !== section._id) {
          return item
        }
        return newSection
      })
      return {
        ...state,
        result: updateObjectInArray(state.result, newCorpse)
      }
    default:
      return state
  }
}

export default corpses
