import {combineReducers} from 'redux';
import corpses from '../reducers/corpses'
import corpse from '../reducers/corpse'
import drawing from '../reducers/drawing'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  corpses, corpse, drawing,
  routing: routerReducer
});
