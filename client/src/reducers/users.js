import { USERS_CHANGE } from 'config/actionTypes'
import API from 'config/api'

const initialState = {
  currentUser: null,
  users: []
}

function users(state = initialState, action) {
  switch (action.type) {
    case API.USER_LOAD.SUCCESS:
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
