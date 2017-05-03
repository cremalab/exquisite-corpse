import factory from 'redux-factory'
import * as utils from './utils'
import * as A from 'config/actionTypes'
import { over, propEq, reject, append, lensProp } from 'ramda'
import * as M from 'config/messages'

const initialState = { list: [] }

const listProp = lensProp('list')

// Message Transforms
// where x is state
// where y is action.payload
export const transforms = {
  [A.DISMISS_MESSAGE]: (x, y) =>
    over(listProp, reject(propEq('id', y.id)), x),

  [`${A.DRAWING_CREATE}_${A.FAILURE}`]: over(
    listProp,
    append(utils.dismissError(M.MESSAGE_CORPSES_EMPTY))
  ),

  [A.SUCCESS_CORPSE_CREATE]: over(
    listProp,
    append(utils.dismissNotice(M.MESSAGE_CORPSE_CREATED))
  ),

  [`${A.DRAWING_COMMIT}_${A.SUCCESS}`]: over(
    listProp,
    append(utils.dismissNotice(M.MESSAGE_DRAWING_COMMIT))
  )
}

export default factory(initialState, transforms, false).reducer
