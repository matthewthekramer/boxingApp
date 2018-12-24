import {
  INIT_TIMER,
  DECREMENT_SEC,
} from './types';

export const initTimer = ({ seconds, minutes }) => {
  return {
    type: INIT_TIMER,
    payload: { seconds, minutes }
  };
};

export const decrementSec = () => {
  return {
    type: DECREMENT_SEC,
    payload: {},
  };
};
