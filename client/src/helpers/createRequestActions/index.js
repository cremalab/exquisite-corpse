import mapObjIndexed from 'ramda/src/mapObjIndexed'
import UrlAssembler from 'url-assembler'

function createRequestActions(apiConfig) {
  return mapObjIndexed((config, key) => (options = {}) => dispatch => {

    const { actions } = options
    let { body } = options

    const url = UrlAssembler('/')
      .template(config.path)
      .param(options.params)
      .query(options.query)
      .toString();

    const getAction = (type, payload) => dispatch => {
      dispatch({ type: config[type], payload })
      if (actions && actions[type]) {
        if ( typeof actions[type] === 'function' )
          dispatch(actions[type](payload))
        else
          dispatch(actions[type])
      }
    }

    if ( body ) body = JSON.stringify(body)

    dispatch(getAction('INITIAL'))
    return fetch(url, {...config, body, credentials: 'include'})
      .then(res => res.json())
      .then(payload => {
        dispatch(getAction('SUCCESS', payload))
        return payload
      })
      .catch(err => {
        dispatch(getAction('FAILURE', err))
        //throw err
      })

  }, apiConfig)
}

export default createRequestActions
