import {
  CLEAR_CORPSE,
  MERGE_CORPSE,
  REMOVE_CORPSE,
  DRAWING_EXPIRATION,
  SUCCESS_SUBSCRIBE,
  FAILURE_SUBSCRIBE,
  CORPSE_LOAD,
  FAILURE,
  SUCCESS,
  INITIAL,
  CORPSE_DESTROY,
} from '../config/actionTypes'

const initialState = {
  loading: false,
  sections: [],
  removed: false,
  creator: {},
  subscribed: false,
}

function corpses(state = initialState, action) {
  switch (action.type) {
    case CORPSE_LOAD:
      return {
        ...state,
        loading: true
      }

    case `${CORPSE_LOAD}_${SUCCESS}`:
      const { result } = action.payload.data
      return {
        loading: false,
        sections: result.sections,
        canvas: result.canvas,
        size: result.size,
        status: result.status,
        createdAt: result.createdAt,
        creator: result.creator,
        _id: result._id,
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
          removed: payload.removed,
        }
      }
      return state

    case `${CORPSE_DESTROY}_${SUCCESS}`:
    case REMOVE_CORPSE:
      if (action.payload._id === state._id) {
        return {...state, sections: [], removed: true}
      }
      return state
    case DRAWING_EXPIRATION:
      if (!action.payload.corpse === state._id) { return state }
      var section = state.sections.find(s => s.drawing._id === action.payload._id)
      var newSection = Object.assign({}, section)
      delete newSection.drawing
      delete newSection.drawer
      var sections = state.sections.map((item) => {
        if (item._id !== section._id) {
          return item
        }
        return newSection
      })
      return {...state, sections}

    case SUCCESS_SUBSCRIBE:
      if (!state._id) return state
      if (action.payload.channel === `/corpses/${state._id}`) {
        return {...state, subscribed: true}
      }
      return state
    case FAILURE_SUBSCRIBE:
      return {...state, subscribed: false}
    default:
      return state
  }
}

export { corpses as default, initialState }
