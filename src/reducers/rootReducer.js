/*
 src/reducers/rootReducer.js
*/

import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import timerReducer from './timerReducer';

export default combineReducers({
    simpleReducer,
    timerReducer
});