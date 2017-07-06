import {
  UI_SET_SECTION,
  UI_MODAL_OPEN,
  UI_MODAL_DISMISS,
} from 'config/actionTypes'

const initialState = {
  activeSection: 'main',
  activeModal: null
}

function ui(state = initialState, action) {
  switch (action.type) {
    case UI_SET_SECTION:
      return {
        ...state,
        activeSection: action.payload,
      }
    case UI_MODAL_OPEN:
      return {
        ...state,
        activeModal: action.payload,
      }
    case UI_MODAL_DISMISS:
      return {
        ...state,
        activeModal: null,
      }
    default:
      return state
  }
}

export default ui
