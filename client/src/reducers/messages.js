import { generate } from 'shortid'

import {
  FAILURE_DRAWING,
  DISMISS_MESSAGE,
  SUCCESS_CORPSE_CREATE,
} from 'config/actionTypes'

const initialState = {
  list: [],
}


function errors(state = initialState, action) {
  switch (action.type) {
    case DISMISS_MESSAGE:
      return {
        ...state,
        list: state.list.filter(m => m.id !== action.payload.id)
      }
    case FAILURE_DRAWING:
      return {
        ...state,
        list: [...state.list, {
          id: generate(),
          message: `No corpses need drawings. Create a new corpse!`,
          type: 'error'
        }],
      }
    case SUCCESS_CORPSE_CREATE:
      return {
        ...state,
        list: [...state.list, {
          id: generate(),
          message: `Corpse successfully created!`,
          type: 'notice'
        }],
      }

    default:
      return state
  }
}

export default errors
