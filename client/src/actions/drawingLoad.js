import {
  REQUEST_DRAWING, SUCCESS_DRAWING, FAILURE
} from 'config/actionTypes'
import corpseLoad from 'actions/corpseLoad'

const initial = ()      => ({ type: REQUEST_DRAWING })
const success = payload => ({ type: SUCCESS_DRAWING, payload })
const fail    = ()      => ({ type: FAILURE })

const drawingLoad = (id, fetchCorpse) => (dispatch, getState, { request }) => dispatch(
  request({ path: `/drawings/${id}`})({ initial, success(p) {
    if (fetchCorpse) { dispatch(corpseLoad(p.result.corpse)) }
    return success(p)
  }, fail })
)

export default drawingLoad
