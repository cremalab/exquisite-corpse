import {CHAT_SEND} from 'config/actionTypes'

const chatMessageSubmit = ({message}) => ({
  type: CHAT_SEND,
  payload: {
    request:{
      url: `/lobby/chat`,
      method: 'POST',
      data: { content: message }
    },
  }
})

export default chatMessageSubmit
