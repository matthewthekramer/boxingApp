import {
  DECREMENT_SEC,
  SET_ROUND_SECONDS,
  SET_ROUND_MINUTES,
  SET_REST_SECONDS,
  SET_REST_MINUTES,
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
    /*
     * Decrements the current time by 1 second, sets warning if 30s remaining in work period
     * if timer goes to 0, starts new rest/work period, alternatiting rest/work periods
    */
    case DECREMENT_SEC: {
      if (state.curSeconds === 0) {
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

    /* sets the amount of seconds for the work period
     * resets the current time to the new round time
     * payload:
     *  seconds - amount of seconds to set rest period to
    */
    case SET_ROUND_SECONDS: {
      if (action.payload.seconds === '') {
        return {
          ...state,
          done: false,
          curMinutes: state.roundTime.minutes,
          curSeconds: '',
          roundCount: 1,
          initialized: true,
          roundTime: {
            seconds: '',
          }

        };
      }
      let seconds = parseInt(action.payload.seconds, 10);
      if (isNaN(seconds)) {
        seconds = state.curSeconds;
      }
      return {
        ...state,
        done: false,
        curMinutes: state.roundTime.minutes,
        curSeconds: seconds,
        roundCount: 1,
        initialized: true,
        roundTime: {
          seconds,
        }
      };
    }
    /* sets the amount of minutes for the work period
     * resets the current time to the new round time
     * payload:
     *  minutes - amount of minutes to set rest period to
    */
    case SET_ROUND_MINUTES: {
      if (action.payload.minutes === '') {
        return {
          ...state,
          done: false,
          curMinutes: '',
          curSeconds: state.roundTime.seconds,
          roundCount: 1,
          initialized: true,
          roundTime: {
            minutes: ''
          }
        };
      }
      let minutes = parseInt(action.payload.minutes, 10);
      if (isNaN(minutes)) {
        minutes = state.curMinutes;
      }
      return {
        ...state,
        done: false,
        curMinutes: minutes,
        curSeconds: state.roundTime.seconds,
        roundCount: 1,
        initialized: true,
        roundTime: {
          minutes,
        }
      };
    }
    /* sets the amount of seconds for the rest period
     * resets the current time to the round time
     * payload:
     *  seconds - amount of seconds to set rest period to
    */
    case SET_REST_SECONDS: {
      if (action.payload.seconds === '') {
        return {
          ...state,
          curMinutes: state.roundTime.minutes,
          curSeconds: state.roundTime.seconds,
          done: false,
          roundCount: 1,
          initialized: true,
          restTime: {
            seconds: ''
          }
        };
      }
      let seconds = parseInt(action.payload.seconds, 10);
      if (isNaN(seconds)) {
        seconds = state.curSeconds;
      }
      return {
        ...state,
        curMinutes: state.roundTime.minutes,
        curSeconds: state.roundTime.seconds,
        resting: false,
        warning: false,
        roundCount: 1,
        initialized: true,
        restTime: {
          seconds,
        }
      };
    }
    /* sets the amount of minutes for the rest period
     * resets the current time to the round time
     * payload:
     *  minutes - amount of minutes to set rest period to
    */
    case SET_REST_MINUTES: {
      if (action.payload.minutes === '') {
        return {
          ...state,
          curMinutes: state.roundTime.minutes,
          curSeconds: state.roundTime.seconds,
          done: false,
          roundCount: 1,
          initialized: true,
          restTime: {
            minutes: ''
          }
        };
      }
      let minutes = parseInt(action.payload.minutes, 10);
      if (isNaN(minutes)) {
        minutes = state.curMinutes;
      }
      return {
        ...state,
        curMinutes: state.roundTime.minutes,
        curSeconds: state.roundTime.seconds,
        resting: false,
        warning: false,
        roundCount: 1,
        initialized: true,
        restTime: {
          minutes,
        }
      };
    }
    //sets interval id and unpauses timer
    //this should be called with a decrement timer call in a setInterval call
    case PLAY_TIMER: {
      return {
        ...state,
        initialized: false,
        intervalID: action.payload.id,
        paused: false,
      };
    }
    //pauses the timer and clears the interval that decrements seconds
    case PAUSE_TIMER: {
      clearInterval(state.intervalID);
      return { ...state, paused: true };
    }
    default:
      return state;
  }
};
