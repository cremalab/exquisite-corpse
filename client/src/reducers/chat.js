import {
  CHAT_MESSAGE_ADD,
  LOBBY_EVENT,
} from 'config/actionTypes'

const initialState = {
  messages: [],
}


function chat(state = initialState, action) {
  switch (action.type) {
    case CHAT_MESSAGE_ADD:
      return {
        ...state,
        messages: [...state.messages, action.payload],
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
