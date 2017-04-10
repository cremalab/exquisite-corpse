import {
  REQUEST_CORPSE,
  SUCCESS_CORPSE,
  CLEAR_CORPSE,
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
      }
    case CLEAR_CORPSE:
      return initialState
    default:
      return state
  }
}

export {corpses as default, initialState};
