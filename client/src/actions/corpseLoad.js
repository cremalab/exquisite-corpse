const corpsesLoad = id => (dispatch, getState, { request2 }) => dispatch(
  request2.CORPSE_LOAD({
    params: { id },

    // additional actions when needed... this does nothing right now
    actions: {
      SUCCESS: payload => ({ type: 'FOOFOO', payload })
    }
  })
)

export default corpsesLoad
