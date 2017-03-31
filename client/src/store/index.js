import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'

const history = createHistory()
const createStoreWithMiddleware = compose(
  applyMiddleware(apiMiddleware, thunk, routerMiddleware(history)),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
)(createStore);
const store = createStoreWithMiddleware(reducers)
export { store as default, history };
