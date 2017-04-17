import {
  CHAT_MESSAGE_ADD,
  USER_STATUS_CHANGE,
  LOBBY_EVENT,
} from 'config/actionTypes'

const initialState = {
  messages: [],
}

const statuses = {
  idle: 'in lobby',
  drawing: 'drawing',
}

function chat(state = initialState, action) {
  switch (action.type) {
    case CHAT_MESSAGE_ADD:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }
    case USER_STATUS_CHANGE:
      var { name, status, timestamp } = action.payload
      var message = {
        content: `${name} is now ${statuses[status]}`,
        name: 'system',
        id: 0,
        timestamp,
      }
      return {
        ...state,
        messages: [...state.messages, message]
      }
    case LOBBY_EVENT:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      }

    default:
      return state
  }
}

export default chat
