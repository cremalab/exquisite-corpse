import {CORPSES_LOAD} from 'config/actionTypes'

const corpsesLoad = () => ({
  type: CORPSES_LOAD,
  payload: {
    request:{
      url:'/corpses'
    },
  }
})

export default corpsesLoad
