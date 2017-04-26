import {push} from 'react-router-redux'

const drawingCommit = id => (dispatch, getState, { api }) => dispatch(
  api.DRAWING_COMMIT({
    params: { id },
    actions: {
      SUCCESS: payload => push(`/corpse/${payload.result._id}`)
    }
  })
)

export default drawingCommit
