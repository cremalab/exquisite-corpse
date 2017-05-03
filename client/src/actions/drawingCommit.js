import {push} from 'react-router-redux'
import {DRAWING_COMMIT} from 'config/actionTypes'

const drawingCommit = id => dispatch => dispatch({
  type: DRAWING_COMMIT,
  payload: {
    request: {
      url: `/drawings/${id}/commit`,
      method: 'POST',
    }
  }
}).then(({payload}) => {
  const { result } = payload.data
  if (result.status === 'complete')
    dispatch(push(`/corpse/${result._id}`))
  else
    dispatch(push(`/`))
})

export default drawingCommit
