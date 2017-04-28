const statusChange = (status) => (dispatch, getState, { api }) => dispatch(
  api.CHAT_STATUS_CHANGE({ body: { status } })
)

export default statusChange
