import {push} from 'react-router-redux'
import {DRAWING_CREATE} from 'config/actionTypes'

const drawingCreate = section => dispatch => dispatch({
  type: DRAWING_CREATE,
  payload: {
    request: {
      url: `/drawings`,
      method: 'POST',
      data: { section },
    }
  }
}).then(({payload}) => {
  const { _id } = payload.data.result
  dispatch(push(`/drawing/${_id}`))
})

export default drawingCreate
