import {
  UI_SET_SECTION,
} from 'config/actionTypes'

const initialState = {
  activeSection: 'main',
}

function ui(state = initialState, action) {
  switch (action.type) {
    case UI_SET_SECTION:
      return {
        ...state,
        activeSection: action.payload,
      }
    default:
      return state
  }
}

export default ui
