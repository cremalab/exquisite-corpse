import {
  REQUEST_CORPSE_DESTROY,
  REMOVE_CORPSE,
  FAILURE,
} from 'config/actionTypes'
import {push} from 'react-router-redux'

const initial = ()      => ({ type: REQUEST_CORPSE_DESTROY })
const success = payload => dispatch => {
  dispatch(({ type: REMOVE_CORPSE, payload }))
  dispatch(push(`/corpse/${payload.result._id}`))
}
const fail    = ()      => ({ type: FAILURE })

const corpsesDestroy = id => (dispatch, getState, { request }) => dispatch(
  request({
    path: `/corpses/${id}`,
    method: 'DELETE',
  })({ initial, success, fail })
)

export default corpsesDestroy
