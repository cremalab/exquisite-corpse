import { compose, createStore, applyMiddleware } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import Nes from 'nes'
import request from 'helpers/wsClientRequest'

const host = location.origin.replace(/^http/, 'ws')
const wsClient = new Nes.Client(host)
const history = createHistory()

const createStoreWithMiddleware = compose(
  applyMiddleware(
    apiMiddleware,
    thunk.withExtraArgument({ wsClient, request }),
    routerMiddleware(history)
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const store = createStoreWithMiddleware(reducers)
export { store as default, history }
