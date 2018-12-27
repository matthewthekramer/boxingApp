import {
  DECREMENT_SEC,
  INIT_TIMER,
  PAUSE_TIMER,
  PLAY_TIMER,
} from '../actions/types';

const INITIAL_STATE = {
  curSeconds: 0, //seconds remaining until the round/rest period is over
  curMinutes: 0, //minutes remaining until the round/rest period is over
  paused: true,
  resting: false, //if currently during the rest time
  warning: false, //if small time remaining during work period
  intervalID: 0,

  roundTime: {
    minutes: 0,
    seconds: 0,
  },
  restTime: {
    minutes: 0,
    seconds: 8,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DECREMENT_SEC:
      if (state.curSeconds === 0) {
        if (state.curMinutes !== 0) {
          return { ...state, curSeconds: 60, curMinutes: state.curMinutes - 1 };
        }
        //out of time
        //if the period that just ran out was a rest period
        if (state.resting) {
          return {
            ...state,
            curSeconds: state.roundTime.seconds,
            curMinutes: state.roundTime.minutes,
            resting: false,
          };
        }
        //if the period that just ran out was a work period
        return {
          ...state,
          curSeconds: state.restTime.seconds,
          curMinutes: state.restTime.minutes,
          resting: true,
          warning: false,
        };
      //if we should set warning
      } else if (!state.resting && state.curSeconds + (state.curMinutes * 60)) {
        return {
          ...state,
          curSeconds: state.curSeconds - 1,
          warning: true,
       };
      }
      //if not out of time, just decrement normally
      return { ...state, curSeconds: state.curSeconds - 1 };
    case INIT_TIMER:
      return {
        ...state,
        done: false,
        curSeconds: action.payload.seconds,
        curMinutes: action.payload.minutes,
        roundTime: {
          seconds: action.payload.seconds,
          minutes: action.payload.minutes,
        }
      };//TODO init rest
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
