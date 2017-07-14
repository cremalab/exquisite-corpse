import {
  UI_SET_SECTION,
  UI_MODAL_OPEN,
  UI_MODAL_DISMISS,
  UI_TUTORIAL_SET,
} from 'config/actionTypes'

const initialState = {
  activeSection: 'main',
  activeModal: null,
  tutorialSeen: false,
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
    case UI_TUTORIAL_SET:
      return {
        ...state,
        tutorialSeen: true,
      }
    default:
      return state
  }
}

export default ui
