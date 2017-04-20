import {
  REQUEST_DRAWINGS,
  SUCCESS_DRAWINGS,
  FAILURE_DRAWINGS,
  DRAWING_EXPIRATION,
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

    case DRAWING_EXPIRATION:
      var match = state.result.find(d => d._id === action.payload._id)
      if (!match) { return state }
      var newDrawing = Object.assign({}, match, { status: 'expired' })
      delete newDrawing.corpse
      delete newDrawing.section

      var drawings = state.result.map((drawing) => {
        if (drawing._id !== newDrawing._id) { return drawing }
        return {
          ...drawing,
          ...newDrawing,
        }
      })
      return {...state, result: drawings }

    default:
      return state
  }
}

export default drawings
