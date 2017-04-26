const chatMessageSubmit = ({message}) => (dispatch, getState, { api }) => dispatch(
  api.CHAT_SEND({ body: { content: message } })
)
export default chatMessageSubmit
