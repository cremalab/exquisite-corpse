import {CHAT_STATUS_CHANGE} from 'config/actionTypes'

const statusChange = status => ({
  type: CHAT_STATUS_CHANGE,
  payload: {
    request:{
      url: `/lobby/status`,
      method: 'POST',
      data: { status }
    },
  }
})

export default statusChange
