import { USERS_CHANGE } from 'config/actionTypes'
import API from 'config/api'
import factory from 'redux-factory'
import { append, lensProp, set } from 'ramda'

const initialState = {
  currentUser: null,
  users: []
}

const usersProp = lensProp('users')
const currentUserProp = lensProp('currentUser')

export const transforms = {
  [API.USER_LOAD.SUCCESS](state, payload) {
    return set(currentUserProp, payload, state)
  },
  [USERS_CHANGE](state, payload) {
    return set(usersProp, payload, state)
  }
}

export default factory(initialState, transforms, false).reducer
