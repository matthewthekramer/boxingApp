import { Actions } from 'react-native-router-flux';
//action creators for the punch editor store
import {
  COMBO_SET_NAME,
  COMBO_ADD_PUNCH,
  COMBO_SWITCH_PUNCH,
  COMBO_SET_SPEED,
  COMBO_SET_PUNCH_NAME,
  COMBO_REMOVE_PUNCH,
  ADD_COMBO,
  COMBO_CLEAR_EDITOR,
  COMBO_START_EDIT,
  UPDATE_COMBO,
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

/*
 * Saves the current combo to the current list of combos, clears the editor
 * data and then routes back to the combo list
 */
export const saveCombo = () => {
  return (dispatch, getState) => {
    if (getState().comboEditor.editing !== -1) {
      dispatch({
        type: UPDATE_COMBO,
        payload: {
          combo: getState().comboEditor.combo,
          idx: getState().comboEditor.editing,
        }
      });
    } else {
      dispatch({
        type: ADD_COMBO,
        payload: {
          combo: getState().comboEditor.combo,
        }
      });
    }
    dispatch({ type: COMBO_CLEAR_EDITOR });
    Actions.pop();
  };
};

export const startEditing = (idx, combo) => {
  return {
    type: COMBO_START_EDIT,
    payload: { idx, combo },
  };
};
