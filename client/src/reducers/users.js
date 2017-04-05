const initialState = {
  currentUser: null,
}

function users(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        currentUser: action.payload,
      }

    default:
      return state
  }
}

export default users
