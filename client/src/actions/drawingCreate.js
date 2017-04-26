import {push} from 'react-router-redux'

const drawingCreate = section => (dispatch, getState, { api }) => dispatch(
  api.DRAWING_CREATE({
    body: { section },
    actions: {
      SUCCESS: payload => push(`/drawing/${payload.result._id}`)
    }
  })
)

export default drawingCreate
