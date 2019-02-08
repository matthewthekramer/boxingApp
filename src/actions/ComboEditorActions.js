//action creators for the punch editor store
import {
  COMBO_SET_NAME,
  COMBO_ADD_PUNCH,
  COMBO_SWITCH_PUNCH,
  COMBO_SET_SPEED,
  COMBO_SET_PUNCH_NAME,
  COMBO_REMOVE_PUNCH,
} from './types';

export const setName = (name) => {
  return {
    type: COMBO_SET_NAME,
    payload: { name },
  };
};

export const setSpeed = (speed, idx) => {
  console.log('new speed', speed);
  return {
    type: COMBO_SET_SPEED,
    payload: { speed, idx },
  };
};

export const addPunch = (punch) => {
  return {
    type: COMBO_ADD_PUNCH,
    payload: { punch },
  };
};

export const switchPunch = (idx1, idx2) => {
  return {
    type: COMBO_SWITCH_PUNCH,
    payload: { idx1, idx2 },
  };
};

export const setPunchName = (name, idx) => {
  return {
    type: COMBO_SET_PUNCH_NAME,
    payload: { name, idx },
  };
};

export const removePunch = (idx) => {
  return {
    type: COMBO_REMOVE_PUNCH,
    payload: { idx },
  };
};
