import { generate } from 'shortid'

import {
  FAILURE_DRAWING,
  DISMISS_MESSAGE,
  SUCCESS_CORPSE_CREATE,
} from 'config/actionTypes'

const initialState = { list: [] }
const ERROR = 'error'
const NOTICE = 'notice'

const createMessage = (message, type, autoDismiss = true) => ({
  id: generate(), message, type, autoDismiss
})
const dismissError  = message => createMessage(message, ERROR , true)
const dismissNotice = message => createMessage(message, NOTICE, true)
const showError     = message => createMessage(message, ERROR , false)
const showNotice    = message => createMessage(message, NOTICE, false)

function messages(state = initialState, action) {
  switch (action.type) {
    case DISMISS_MESSAGE:
      return {
        ...state,
        list: state.list.filter(m => m.id !== action.payload.id)
      }
    case FAILURE_DRAWING:
      return {
        ...state,
        list: [
          ...state.list,
          dismissError(`No corpses need drawings. Create a new corpse!`)
        ],
      }
    case SUCCESS_CORPSE_CREATE:
      return {
        ...state,
        list: [
          ...state.list,
          dismissNotice(`Corpse successfully created!`)
        ],
      }

    default:
      return state
  }
}

export default messages
