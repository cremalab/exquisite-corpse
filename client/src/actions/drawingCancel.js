import {push} from 'react-router-redux'

const drawingCancel = id => (dispatch, getState, { api }) => dispatch(
  api.DRAWING_DESTROY({
    params: { id },
    actions: {
      SUCCESS: payload => push(`/corpse/${payload.result.corpse}`)
    }
  })
)

export default drawingCancel
