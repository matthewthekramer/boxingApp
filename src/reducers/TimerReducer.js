import {
  DECREMENT_SEC,
  INIT_TIMER,
} from '../actions/types';

const INITIAL_STATE = {
  seconds: 0,
  minutes: 0,
  done: false,
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
    default:
      return state;
  }
};
