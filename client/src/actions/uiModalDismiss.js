import { UI_MODAL_DISMISS } from 'config/actionTypes'

const uiModalDismiss = id => ({
  type: UI_MODAL_DISMISS,
  payload: id
})

export default uiModalDismiss
