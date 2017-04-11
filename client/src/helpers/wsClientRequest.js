const request = ({path, ...config}) => actions => (dispatch, getState, { wsClient }) => {
  if (actions.initial) dispatch(actions.initial())
  return fetch(path, {
    ...config,
    credentials: 'include'
  })
  .then(res => res.json())
  .then(payload => {
    if (actions.success) dispatch(actions.success(payload))
    return payload
  })
  .catch(err => {
    if (actions.fail) dispatch(actions.fail(err))
    throw err
  })
}

export default request
