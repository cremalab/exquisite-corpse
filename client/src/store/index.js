import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import Nes from 'nes/client'
import request from 'helpers/wsClientRequest'

const wsClient = new Nes.Client(location.origin.replace(/^http/, 'ws'))
const history = createHistory()

const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunk.withExtraArgument({ wsClient, request }),
    routerMiddleware(history)
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const store = createStoreWithMiddleware(reducers)
export { store as default, history }
