import {
  DECREMENT_SEC,
  PLAY_TIMER,
  PAUSE_TIMER,
  SET_ROUND_MINUTES,
  SET_ROUND_SECONDS,
  SET_REST_MINUTES,
  SET_REST_SECONDS,
  RESET_TIMER,
} from './types';

//if called multiple times without a pause, will speed up countdown
//should disable usage while button is running
export const startTimer = () => {
  return (dispatch) => {
    const intervalID = setInterval(() => dispatch({ type: DECREMENT_SEC }), 1000);
    dispatch({
      type: PLAY_TIMER,
      payload: {
        id: intervalID
      }
    });
  };
};

export const pauseTimer = () => {
  return {
    type: PAUSE_TIMER,
    payload: {},
  };
};

export const setRoundMinutes = ({ minutes }) => {
  return {
    type: SET_ROUND_MINUTES,
    payload: { minutes }
  };
};

export const setRoundSeconds = ({ seconds }) => {
  return {
    type: SET_ROUND_SECONDS,
    payload: { seconds }
  };
};

export const setRestMinutes = ({ minutes }) => {
  return {
    type: SET_REST_MINUTES,
    payload: { minutes }
  };
};

export const setRestSeconds = ({ seconds }) => {
  return {
    type: SET_REST_SECONDS,
    payload: { seconds }
  };
};

export const resetTimer = () => {
  return {
    type: RESET_TIMER,
  };
};
