import {
  DECREMENT_SEC,
  INIT_TIMER,
  PAUSE_TIMER,
  PLAY_TIMER,
  SET_REST,
} from '../actions/types';

const INITIAL_STATE = {
  curSeconds: 0, //seconds remaining until the round/rest period is over
  curMinutes: 0, //minutes remaining until the round/rest period is over
  paused: true,
  resting: false, //if currently during the rest time
  warning: false, //if small time remaining during work period
  intervalID: 0, //keeps track of interval used to decrement second
  roundCount: 1, //keeps track of number of work rounds completed
  initialized: true, //this is true when timer hasn't been started for a given round time

  roundTime: {
    minutes: 0,
    seconds: 0,
  },
  restTime: {
    minutes: 0,
    seconds: 10,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DECREMENT_SEC: {
      if (state.curSeconds === 0) {
        console.log(state.curMinutes);
        //convert a minute into 60 seconds if there are minutes remaining
        if (state.curMinutes !== 0) {
          return { ...state, curSeconds: 59, curMinutes: state.curMinutes - 1 };
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
          roundCount: state.roundCount + 1,
        };
      //if we should set warning
    } else if (!state.resting && state.curSeconds + (state.curMinutes * 60) < 30) {
        return {
          ...state,
          curSeconds: state.curSeconds - 1,
          warning: true,
       };
      }
      //if not out of time, just decrement normally
      return { ...state, curSeconds: state.curSeconds - 1 };
    }
    case INIT_TIMER: {
      let seconds = parseInt(action.payload.seconds, 10);
      if (isNaN(seconds)) {
        seconds = state.curSeconds;
      }
      let minutes = parseInt(action.payload.minutes, 10);
      if (isNaN(minutes)) {
        minutes = state.curMinutes;
      }
      return {
        ...state,
        done: false,
        curSeconds: seconds,
        curMinutes: minutes,
        roundCount: 1,
        initialized: true,
        roundTime: {
          seconds,
          minutes,
        }
      };
    }
    //also resets the timer
    case SET_REST: {
      let seconds = parseInt(action.payload.seconds, 10);
      if (isNaN(seconds)) {
        seconds = state.curSeconds;
      }
      let minutes = parseInt(action.payload.minutes, 10);
      if (isNaN(minutes)) {
        minutes = state.curMinutes;
      }

      return {
        ...state,
        curSeconds: seconds,
        curMinutes: minutes,
        resting: false,
        warning: false,
        roundCount: 1,
        initialized: true,
        restTime: {
          seconds,
          minutes,
        }
      };
    }
    //sets interval id and unpauses timer
    case PLAY_TIMER: {
      return {
        ...state,
        initialized: false,
        intervalID: action.payload.id,
        paused: false,
      };
    }
    case PAUSE_TIMER: {
      clearInterval(state.intervalID);
      return { ...state, paused: true };
    }
    default:
      return state;
  }
};
