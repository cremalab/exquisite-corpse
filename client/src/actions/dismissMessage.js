import {MESSAGE_DISMISS} from 'config/actionTypes'

const drawingClear = id => ({
  type: MESSAGE_DISMISS,
  payload: id ,
})

export default drawingClear
