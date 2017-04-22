import {
  REQUEST_CORPSE_DESTROY,
  REMOVE_CORPSE,
  FAILURE,
} from 'config/actionTypes'
import {push} from 'react-router-redux'

const initial = ()      => ({ type: REQUEST_CORPSE_DESTROY })
const success = payload => dispatch => {
  dispatch(push(`/`))
  dispatch(({ type: REMOVE_CORPSE, payload }))
}
const fail    = ()      => ({ type: FAILURE })

const corpsesDestroy = id => (dispatch, getState, { request }) => dispatch(
  request({
    path: `/corpses/${id}`,
    method: 'DELETE',
  })({ initial, success, fail })
)

export default corpsesDestroy
