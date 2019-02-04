import { combineReducers } from 'redux';
import TimerReducer from './TimerReducer';
import ComboWorkoutReducer from './ComboWorkoutReducer';
import ComboEditorReducer from './ComboEditorReducer';
//creates the state from combining the different reducers
export default combineReducers({
  timer: TimerReducer,
  comboWorkout: ComboWorkoutReducer,
  comboEditor: ComboEditorReducer,
});
