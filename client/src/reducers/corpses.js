import {
  REQUEST_CORPSES,
  SUCCESS_CORPSES,
  SUCCESS_CORPSE_CREATE,
  MERGE_CORPSE
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
    default:
      return state
  }
}

export default corpses
