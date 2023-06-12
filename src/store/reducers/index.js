// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import student from './student';
import major from './major';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, student, major });

export default reducers;
