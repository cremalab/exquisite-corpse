import {DISMISS_MESSAGE} from 'config/actionTypes'

const drawingClear = (id) => ({
  type: DISMISS_MESSAGE,
  payload: { id },
})

export default drawingClear
