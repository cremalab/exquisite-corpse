import {
  REQUEST_CORPSE_CREATE,
  SUCCESS_CORPSE_CREATE,
  FAILURE,
} from 'config/actionTypes'
import {push} from 'react-router-redux'

const initial = ()      => ({ type: REQUEST_CORPSE_CREATE })
const success = payload => dispatch => {
  dispatch(({ type: SUCCESS_CORPSE_CREATE, payload }))
  dispatch(push(`/corpse/${payload.result._id}`))
}
const fail    = ()      => ({ type: FAILURE })

const corpsesCreate = values => (dispatch, getState, { request }) => dispatch(
  request({
    path: `/corpses`,
    method: 'POST',
    body: JSON.stringify(values)
  })({ initial, success, fail })
)

export default corpsesCreate
