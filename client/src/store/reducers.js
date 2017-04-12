import {combineReducers} from 'redux'
import corpses from '../reducers/corpses'
import corpse from '../reducers/corpse'
import drawing from '../reducers/drawing'
import users from '../reducers/users'
import chat from '../reducers/chat'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { SUCCESS_CHAT_MESSAGE_CREATE } from 'config/actionTypes'

export default combineReducers({
  corpses, corpse, drawing, users, chat,
  routing: routerReducer,
  form: formReducer.plugin({
    chatInput(state, action) {
      switch(action.type) {
        case SUCCESS_CHAT_MESSAGE_CREATE:
          return undefined
        default:
          return state
      }
    }
  })
})
