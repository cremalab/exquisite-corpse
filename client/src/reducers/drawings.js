import API from 'config/api'
import {DRAWING_EXPIRATION} from 'config/actionTypes'
import getSocketAction from 'helpers/getSocketAction'

const initialState = {
  loading: false,
  result: [],
}

function drawings(state = initialState, action) {
  switch (action.type) {
    case API.DRAWINGS_LOAD.INITIAL:
      return {
        ...state,
        loading: true
      }

    case API.DRAWINGS_LOAD.SUCCESS:
      return {
        ...state,
        loading: false,
        result: action.payload.result
      }

    case API.DRAWINGS_LOAD.FAILURE:
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
