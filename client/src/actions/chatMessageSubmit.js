import {
  REQUEST_CHAT_MESSAGE_CREATE,
  SUCCESS_CHAT_MESSAGE_CREATE,
  FAILURE,
} from 'config/actionTypes'

const initial = ()      => ({ type: REQUEST_CHAT_MESSAGE_CREATE })
const success = payload => ({ type: SUCCESS_CHAT_MESSAGE_CREATE, payload })
const fail    = ()      => ({ type: FAILURE })

const chatMessageSubmit = () => (dispatch, getState, { request }) => dispatch(
  request({ path: `/lobby/chat`, method: 'POST' })({ initial, success, fail })
)

export default chatMessageSubmit
