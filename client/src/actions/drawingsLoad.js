const drawingsLoad = (status) => (dispatch, getState, { api }) => dispatch(
  api.DRAWINGS_LOAD({ query: { status } })
)

export default drawingsLoad
