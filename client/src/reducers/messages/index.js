import factory from 'redux-factory'
import * as utils from './utils'
import * as A from 'config/actionTypes'
import { over, propEq, reject, append, lensProp } from 'ramda'

const initialState = { list: [] }

const listProp = lensProp('list')

// Message Transforms
// where x is state
// where y is action.payload
export const transforms = {
  [A.DISMISS_MESSAGE]: (x, y) =>
    over(listProp, reject(propEq('id', y.id)), x),

  [A.FAILURE_DRAWING]: over(
    listProp,
    append(utils.dismissError(`No corpses need drawings. Create a new corpse!`))
  ),

  [A.SUCCESS_CORPSE_CREATE]: over(
    listProp,
    append(utils.dismissNotice(`Corpse successfully created!`))
  ),
}

export default factory(initialState, transforms, false).reducer
