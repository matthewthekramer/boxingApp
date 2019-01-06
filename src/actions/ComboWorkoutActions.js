import {
  ADD_COMBO,
  REMOVE_COMBO,
  DESELECT_COMBO,
  SELECT_COMBO,
  NEXT_COMBO,
  TOGGLE_RANDOM,
  CLEAR_CUR_COMBO,
} from './types';

export const addTimer = (combo) => {
  return (dispatch) => {
    dispatch({ type: CLEAR_CUR_COMBO });
    dispatch({ type: ADD_COMBO, payload: { combo } });
  };
};

export const removeCombo = (idx) => {
  return (dispatch) => {
    dispatch({ type: CLEAR_CUR_COMBO });
    dispatch({ type: REMOVE_COMBO, payload: { idx } });
  };
};

export const deselectCombo = (idx) => {
  return (dispatch) => {
    dispatch({ type: CLEAR_CUR_COMBO });
    dispatch({ type: DESELECT_COMBO, payload: { idx } });
  };
};

export const selectCombo = (idx) => {
  return (dispatch) => {
    dispatch({ type: CLEAR_CUR_COMBO });
    dispatch({ type: SELECT_COMBO, payload: { idx } });
  };
};

export const nextCombo = () => {
  return {
    type: NEXT_COMBO,
    payload: {},
  };
};

export const toggleRandom = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_CUR_COMBO });
    dispatch({ type: TOGGLE_RANDOM });
  };
};

export const clearCurCombo = () => {
  return {
    type: CLEAR_CUR_COMBO,
    payload: {},
  };
};
