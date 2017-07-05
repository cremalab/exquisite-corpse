import { UI_SET_SECTION } from 'config/actionTypes'

const uiSetSection = section => ({
  type: UI_SET_SECTION,
  payload: section
})

export default uiSetSection
