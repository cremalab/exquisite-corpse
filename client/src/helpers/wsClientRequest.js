const request = config => actions => (dispatch, getState, { wsClient }) => {
  if (actions.initial) dispatch(actions.initial())
  wsClient.request(config, (err, payload) => {
    if (err) {
      throw err
      if (actions.fail) dispatch(actions.fail(err))
    } else {
      if (actions.success) dispatch(actions.success(payload))
    }
  })
}

export default request
