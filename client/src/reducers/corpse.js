const initialState = {
  loading: false,
  sections: []
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
        sections: action.payload.result.sections,
        canvas: action.payload.result.canvas,
        status: action.payload.result.status,
      }
    default:
      return state
  }
}

export default corpses;
