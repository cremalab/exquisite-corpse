const initialState = {
  loading: false,
  result: {}
}

function corpses(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_SAVE_DRAWING':
    case 'REQUEST_DRAWING':
      return {
        ...state,
        loading: true
      }

    case 'SUCCESS_SAVE_DRAWING':
    case 'SUCCESS_DRAWING':
      return {
        loading: false,
        result: action.payload.result
      }

    case 'FAILURE_DRAWING':
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default corpses;
