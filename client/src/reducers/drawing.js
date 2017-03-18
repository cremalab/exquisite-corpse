const initialState = {
  loading: false,
  result: {}
}

function corpses(state = initialState, action) {
  switch (action.type) {
    case 'DRAWING_SET':
      return {
        ...state,
        result: action.payload
      }
    default:
      return state
  }
}

export default corpses;
