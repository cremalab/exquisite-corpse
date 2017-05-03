import {CORPSE_LOAD} from 'config/actionTypes'

const corpseLoad = id => ({
  type: CORPSE_LOAD,
  payload: {
    request:{
      url: `/corpses/${id}`
    },
  }
})

export default corpseLoad
