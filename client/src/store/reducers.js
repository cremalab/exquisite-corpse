import {combineReducers} from 'redux';
import corpses from '../reducers/corpses'
import corpse from '../reducers/corpse'

export default combineReducers({ corpses, corpse });
