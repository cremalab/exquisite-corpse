import {DRAWINGS_LOAD} from 'config/actionTypes'

const drawingsLoad = status => ({
  type: DRAWINGS_LOAD,
  payload: {
    request:{
      url: '/me/drawings',
      method: 'GET',
      params: { status }
    },
  }
})

export default drawingsLoad
