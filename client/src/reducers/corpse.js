const initialState = {
  loading: false,
  drawings: []
}

function corpses(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_CORPSE':
      return {
        ...state,
        loading: true
      }

    case 'SUCCESS_CORPSE':
      return {
        loading: false,
        drawings: action.payload.result.sections
      }
    default:
      return state
  }
}

export default corpses;
