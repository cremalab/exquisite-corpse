import {push} from 'react-router-redux'
import {DRAWING_DESTROY} from 'config/actionTypes'

const drawingCancel = id => dispatch => dispatch({
  type: DRAWING_DESTROY,
  payload: {
    request:{
      url: `/drawings/${id}`,
      method: 'DELETE',
    },
  }
}).then(() => {
  dispatch(push(`/`))
})

export default drawingCancel
