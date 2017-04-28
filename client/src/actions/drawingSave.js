import {push} from 'react-router-redux'

const drawingSave = (id, canvas) => (dispatch, getState, { api }) => dispatch(
  api.DRAWING_SAVE({ body: { canvas }, params: { id }})
)

export default drawingSave
