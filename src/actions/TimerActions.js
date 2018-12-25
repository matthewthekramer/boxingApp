import {
  INIT_TIMER,
  DECREMENT_SEC,
  PLAY_TIMER,
  PAUSE_TIMER,
} from './types';


export const startTimer = () => {
  return (dispatch) => {
    const intervalID = setInterval(dispatch({ type: DECREMENT_SEC }), 1000);
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
  };
}

export const initTimer = ({ seconds, minutes }) => {
  return {
    type: INIT_TIMER,
    payload: { seconds, minutes }
  };
};
