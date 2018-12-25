import {
  DECREMENT_SEC,
  INIT_TIMER,
  PAUSE_TIMER,
  PLAY_TIMER,
} from '../actions/types';

const INITIAL_STATE = {
  seconds: 0,
  minutes: 0,
  done: false,
  paused: false,
  intervalID: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DECREMENT_SEC:
      if (state.seconds === 0) {
        if (state.minutes !== 0) {
          return { ...state, seconds: 60, minutes: state.minutes - 1 };
        }
        return { ...state, done: true };
      }
      return { ...state, seconds: state.seconds - 1 };
    case INIT_TIMER:
      return {
        ...state,
        done: false,
        seconds: action.payload.seconds,
        minutes: action.payload.minutes,
      };
    //sets interval id and unpauses timer
    case PLAY_TIMER:
      return {
        ...state,
        intervalID: action.payload.id,
        paused: false,
      };
    case PAUSE_TIMER:
      clearInterval(state.intervalID);
      return { ...state, paused: true };
    default:
      return state;
  }
};
