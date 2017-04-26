const corpsesLoad = () => (dispatch, getState, { api }) => dispatch(
  api.CORPSES_LOAD()
)

export default corpsesLoad
