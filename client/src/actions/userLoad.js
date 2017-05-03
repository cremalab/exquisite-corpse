import {USER_LOAD} from 'config/actionTypes'

const userLoad = () => ({
  type: USER_LOAD,
  payload: {
    request:{
      url: '/lobby',
      method: 'POST',
    },
  }
})

export default userLoad
