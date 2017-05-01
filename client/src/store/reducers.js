import {combineReducers} from 'redux'
import corpses from 'reducers/corpses'
import corpse from 'reducers/corpse'
import drawing from 'reducers/drawing'
import drawings from 'reducers/drawings'
import users from 'reducers/users'
import chat from 'reducers/chat'
import time from 'reducers/time'
import messages from 'reducers/messages'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import API from 'config/api'

export default combineReducers({
  chat,
  corpses,
  corpse,
  drawings,
  drawing,
  users,
  messages,
  time,
  routing: routerReducer,
  form: formReducer.plugin({
    chatInput(state, action) {
      switch(action.type) {
        case API.CHAT_SEND.SUCCESS:
          return undefined
        default:
          return state
      }
    }
  })
})
