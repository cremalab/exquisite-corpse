import {push} from 'react-router-redux'
import {CORPSE_CREATE} from 'config/actionTypes'

const corpsesCreate = data => dispatch => dispatch({
  type: CORPSE_CREATE,
  payload: {
    request:{
      url: `/corpses`,
      method: 'POST',
      data
    },
  }
}).then(({ payload }) => {
  dispatch(push(`/corpse/${payload.data.result._id}`))
})

export default corpsesCreate
