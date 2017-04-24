const request = ({path, ...config}) => actions => (dispatch, getState, { wsClient }) => {
  if (actions.initial) dispatch(actions.initial())
  return fetch(path, {
    ...config,
    credentials: 'include'
  })
  .then(res => res.json())
  .then(res => {
    if(res.error) {
      throw res
    }
    return res
  })
  .then(payload => {
    if (actions.success) dispatch(actions.success(payload))
  })
  .catch(err => {
    if (actions.fail) dispatch(actions.fail(err))
  })
}

export default request
