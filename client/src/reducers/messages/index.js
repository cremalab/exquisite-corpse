import factory from 'redux-factory'
import { messageError, messageNotice } from './utils'
import * as A from 'config/actionTypes'
import { identity } from 'ramda'
import { listItemRemoveById, listItemAppendWith } from 'transforms'

const initialState = { list: [] }

// Message Transforms
// where x is state
// where y is action.payload
export const transforms = {
  [A.MESSAGE_DISMISS]: listItemRemoveById,
  [A.REQUEST_INITIAL]: identity,
  [A.REQUEST_SUCCESS]: listItemAppendWith(messageNotice),
  [A.REQUEST_FAILURE]: listItemAppendWith(messageError),
}

export default factory(initialState, transforms, false).reducer
