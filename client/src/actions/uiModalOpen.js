import { UI_MODAL_OPEN } from 'config/actionTypes'

const uiModalOpen = id => ({
  type: UI_MODAL_OPEN,
  payload: id
})

export default uiModalOpen
