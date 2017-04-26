import {push} from 'react-router-redux'

const corpsesCreate = body => (dispatch, getState, { api }) => dispatch(
  api.CORPSE_CREATE({
    body,
    actions: {
      SUCCESS: ({result: {_id}}) => push(`/corpse/${_id}`)
    }
  })
)

export default corpsesCreate
