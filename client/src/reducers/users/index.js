import { USER_LOAD, SUCCESS, USERS_CHANGE } from 'config/actionTypes'
import factory from 'redux-factory'
import { append, lensProp, set } from 'ramda'

const initialState = {
  currentUser: null,
  users: []
}

const usersProp = lensProp('users')
const currentUserProp = lensProp('currentUser')

export const transforms = {
  [`${USER_LOAD}_${SUCCESS}`](state, payload) {
    return set(currentUserProp, payload.data, state)
  },
  [USERS_CHANGE](state, payload) {
    return set(usersProp, payload, state)
  }
}

export default factory(initialState, transforms, false).reducer
