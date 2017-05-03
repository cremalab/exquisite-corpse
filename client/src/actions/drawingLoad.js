import corpseLoad from 'actions/corpseLoad'
import {DRAWING_LOAD} from 'config/actionTypes'

const drawingLoad = id => dispatch => dispatch({
  type: DRAWING_LOAD,
  payload: {
    request: {
      url: `/drawings/${id}`
    }
  }
}).then(({ payload }) => {
  const { corpse } = payload.data.result
  if ( corpse ) dispatch(corpseLoad(corpse))
})

export default drawingLoad
