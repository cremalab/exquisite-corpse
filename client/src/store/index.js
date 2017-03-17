import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import reducers from './reducers';

const createStoreWithMiddleware = compose(
  applyMiddleware(apiMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
)(createStore);

export default createStoreWithMiddleware(reducers);
