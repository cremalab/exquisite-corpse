import {push} from 'react-router-redux'

const corpsesDestroy = id => (dispatch, getState, { api }) => dispatch(
  api.CORPSE_DESTROY({
    params: { id },
    actions: {
      SUCCESS: push(`/`)
    }
  })
)

export default corpsesDestroy
