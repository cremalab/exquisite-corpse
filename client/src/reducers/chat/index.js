import factory from 'redux-factory'
import {CHAT_MESSAGE, GENERIC_EVENT} from 'config/actionTypes'
import { append, lensProp, over } from 'ramda'

const initialState = { messages: [] }
const messagesProp = lensProp('messages')

const addMessage = (state, payload) =>
  over(messagesProp, append(payload), state)

export const transforms = {
  [CHAT_MESSAGE]  : addMessage,
  [GENERIC_EVENT] : addMessage,
}

export default factory(initialState, transforms, false).reducer
