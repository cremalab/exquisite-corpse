import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import Nes from 'nes/client'
import axios from 'axios'
import {INITIAL, SUCCESS, FAILURE} from 'config/actionTypes'
import axiosMiddleware from 'redux-axios-middleware'

const wsClient = new Nes.Client(location.origin.replace(/^http/, 'ws'))
const history = createHistory()

const client = axios.create({
  responseType: 'json',
})

const axiosConf = {
  returnRejectedPromiseOnError: true
}

const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunk.withExtraArgument({ wsClient }),
    routerMiddleware(history),
    axiosMiddleware(client, axiosConf),
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const store = createStoreWithMiddleware(reducers)
export { store as default, history }
