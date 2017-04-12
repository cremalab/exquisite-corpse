import {
  SET_USER,
  USERS_CHANGE,
} from 'config/actionTypes'

const initialState = {
  currentUser: null,
  users: []
}

function users(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
      }
    case USERS_CHANGE:
      return {
        ...state,
        users: action.payload
      }
    default:
      return state
  }
}

export default users
