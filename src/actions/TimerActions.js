import {
  INIT_TIMER,
  DECREMENT_SEC,
  PLAY_TIMER,
  PAUSE_TIMER,
  SET_REST,
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

export const initTimer = ({ seconds, minutes }) => {
  return {
    type: INIT_TIMER,
    payload: { seconds, minutes }
  };
};

export const setRest = ({ seconds, minutes }) => {
  return {
    type: SET_REST,
    payload: { seconds, minutes },
  };
};
