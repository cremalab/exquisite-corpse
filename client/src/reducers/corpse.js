import {
  REQUEST_CORPSE,
  SUCCESS_CORPSE,
  CLEAR_CORPSE,
  MERGE_CORPSE,
} from '../config/actionTypes'

const initialState = {
  loading: false,
  sections: []
}

function corpses(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CORPSE:
      return {
        ...state,
        loading: true
      }

    case SUCCESS_CORPSE:
      return {
        loading: false,
        sections: action.payload.result.sections,
        canvas: action.payload.result.canvas,
        size: action.payload.result.size,
        status: action.payload.result.status,
        _id: action.payload.result._id,
      }
    case CLEAR_CORPSE:
      return initialState
    case MERGE_CORPSE:
      if (action.payload._id === state._id) {
        const { payload } = action
        return {
          ...state,
          sections: payload.sections,
          size: payload.size,
          status: payload.status,
          canvas: payload.canvas,
        }
      }
      return state
    default:
      return state
  }
}

export { corpses as default, initialState }
