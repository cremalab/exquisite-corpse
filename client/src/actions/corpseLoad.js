const corpsesLoad = id => (dispatch, getState, { api }) => dispatch(
  api.CORPSE_LOAD({
    params: { id },

    // additional actions when needed... this does nothing right now
    actions: {
      SUCCESS: payload => ({ type: 'FOOFOO', payload })
    }
  })
)

export default corpsesLoad
