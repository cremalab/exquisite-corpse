import {DRAWING_SAVE} from 'config/actionTypes'

const drawingSave = (id, canvas) => ({
  type: DRAWING_SAVE,
  payload: {
    request: {
      url: `/drawings/${id}`,
      method: 'PUT',
      data: { canvas }
    }
  }
})

export default drawingSave
