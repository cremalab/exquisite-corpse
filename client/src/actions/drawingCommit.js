import {push} from 'react-router-redux'


const SUCCESS = ({result}) => {
  if (result.status === 'complete')
    dispatch(push(`/corpse/${result._id}`))
  else
    dispatch(push(`/`))
}

const drawingCommit = id => (dispatch, getState, { api }) => dispatch(
  api.DRAWING_COMMIT({
    params: { id },
    actions: { SUCCESS }
  })
)

export default drawingCommit
