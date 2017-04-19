import {
  REQUEST_DRAWINGS,
  SUCCESS_DRAWINGS,
  FAILURE_DRAWINGS,
} from 'config/actionTypes'

const initialState = {
  loading: false,
  result: [],
}

function drawings(state = initialState, action) {
  switch (action.type) {
    case REQUEST_DRAWINGS:
      return {
        ...state,
        loading: true
      }

    case SUCCESS_DRAWINGS:
      return {
        ...state,
        loading: false,
        result: action.payload.result
      }

    case FAILURE_DRAWINGS:
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}

export default drawings
