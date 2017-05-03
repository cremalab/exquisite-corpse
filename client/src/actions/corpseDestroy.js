import {push} from 'react-router-redux'
import {CORPSE_DESTROY} from 'config/actionTypes'

const corpsesDestroy = id => dispatch => dispatch({
  type: CORPSE_DESTROY,
  payload: {
    request:{
      url: `/corpses/${id}`,
      method: 'DELETE',
    },
  }
}).then(() => {
  dispatch(push(`/`))
})

export default corpsesDestroy
