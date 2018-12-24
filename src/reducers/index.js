import { combineReducers } from 'redux';
import TimerReducer from './TimerReducer';
//creates the state from combining the different reducers
export default combineReducers({
  timer: TimerReducer 
});
