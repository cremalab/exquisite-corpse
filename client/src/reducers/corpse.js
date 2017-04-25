import {
  REQUEST_CORPSE,
  SUCCESS_CORPSE,
  CLEAR_CORPSE,
  MERGE_CORPSE,
  REMOVE_CORPSE,
  DRAWING_EXPIRATION,
  SUCCESS_SUBSCRIBE,
  FAILURE_SUBSCRIBE,
} from '../config/actionTypes'
import API from 'config/api'

const initialState = {
  loading: false,
  sections: [],
  removed: false,
  creator: {},
  subscribed: false,
}

function corpses(state = initialState, action) {
  switch (action.type) {
    case API.CORPSE_LOAD.INITIAL:
      return {
        ...state,
        loading: true
      }

    case API.CORPSE_LOAD.SUCCESS:
      return {
        loading: false,
        sections: action.payload.result.sections,
        canvas: action.payload.result.canvas,
        size: action.payload.result.size,
        status: action.payload.result.status,
        createdAt: action.payload.result.createdAt,
        creator: action.payload.result.creator,
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
          removed: payload.removed,
        }
      }
      return state
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
