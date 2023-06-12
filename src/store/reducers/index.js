// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import student from './student';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, student });

export default reducers;
