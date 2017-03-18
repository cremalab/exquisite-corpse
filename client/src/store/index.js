import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { routerMiddleware } from 'react-router-redux';
import history from 'config/history'

const createStoreWithMiddleware = compose(
  applyMiddleware(apiMiddleware, thunk, routerMiddleware(history)),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
)(createStore);

export default createStoreWithMiddleware(reducers);
