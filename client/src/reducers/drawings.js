import {DRAWING_EXPIRATION, DRAWINGS_LOAD, SUCCESS, FAILURE} from 'config/actionTypes'

const initialState = {
  loading: false,
  result: [],
}

function drawings(state = initialState, action) {
  switch (action.type) {
    case DRAWINGS_LOAD:
      return {
        ...state,
        loading: true
      }

    case `${DRAWINGS_LOAD}_${SUCCESS}`:
      return {
        ...state,
        loading: false,
        result: action.payload.data.result
      }

    case `${DRAWINGS_LOAD}_${FAILURE}`:
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
