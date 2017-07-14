import uiModalDismiss from 'actions/uiModalDismiss'
import uiTutorialSet from 'actions/uiTutorialSet'

const uiDismissTutorial = () => dispatch => {
  dispatch(uiModalDismiss())
  dispatch(uiTutorialSet(true))
}


export default uiDismissTutorial
