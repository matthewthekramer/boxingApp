/*
 * This reducer keeps track of the current state for combination workouts
 */
 import {
   ADD_COMBO,
   REMOVE_COMBO,
   DESELECT_COMBOS,
   SELECT_COMBO,
   DESELECT_COMBO,
   NEXT_COMBO,
   TOGGLE_RANDOM,
   CLEAR_CUR_COMBO,
 } from '../actions/types';

 const INITIAL_STATE = {
   combinations: [], //holds all combinations the user has saved
   //each element corresponds to an element in combinations, number determines order
   //element contains 0 if not selected | Example: [1, 3, 0, 2] means the user has
   //selected in order the first combo, the fourth combo, and the second combo
   selected: [],
   //used to keep track of the highest selected value (in above example would be 3)
   highestSelection: 0,
   random: false, //if combos are given in random order or selected order
   curCombo: {}, //the next punch to be thrown
   curComboIdx: -1, //idx in combinations of the next punch to be thrown
   started: false, //if the workout is currently happening
 };


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //payload:
    //  combo: combo to add
    case ADD_COMBO: {
      return {
        ...state,
        combinations: state.combinations.push(action.payload.combo),
        selected: state.selected.push(0), //initialized as unselected
      };
    //should only happen when nothing is selected
    } case REMOVE_COMBO: {
      const newState = state;
      newState.combinations.splice(action.payload.idx, 1);
      newState.selected.splice(action.payload.idx, 1);
      return newState;
    //sets selection for all combos to 0
    } case DESELECT_COMBOS: {
      return {
        ...state,
        selected: state.selected.fill(0),
      };
    /*
     * selects a combination
     * payload:
     *  idx: index of the combination to select
     */
    } case SELECT_COMBO: {
      const newState = state;
      newState.selected[action.payload.idx] = ++newState.highestSelection;
      return {
        ...newState,
        selected: state.selected,
      };
    /*
     * payload:
     * idx: index of the combination to deselect
     */
    } case DESELECT_COMBO: {
      //does nothing if selected has nothing and combinations has bad length
      if (state.selected === [] || state.combinations.length <= action.payload.idx) {
        return state;
      }
      const newSelected = state.selected;
      const selectionThreshold = newSelected[action.payload.idx];
      //first past finds the combo and removes it
      //decrements all selections with a higher selection than unselected index
      for (let i = 0; i < newSelected.length; ++i) {
        if (newSelected[i] > selectionThreshold) {
          --newSelected[i];
        }
      }
      //deselect the requested index
      newSelected[action.payload.idx] = 0;
      return {
        ...state,
        selected: newSelected,
      };
    /* if random, sets next combo to a random one
     * if not, sets the next combo to the next in order combo
     * workout must be started to be able to call this
     */
    } case NEXT_COMBO: {
      if (!state.started) {
        return state;
      } else if (state.random) {
        const randIdx = Math.floor(Math.random() * state.combinations.length);
        return {
          ...state,
          curCombo: state.combinations[randIdx],
          curComboIdx: randIdx,
        };
      } else if (state.curCombo === {}) {
        let firstIdx = -1;
        for (let i = 0; i < state.selected.length; ++i) {
          if (state.selected[i] === 1) {
            firstIdx = i;
          }
        }
        //happens if nothing is selected
        if (firstIdx === -1) {
          return state;
        }
        return {
          ...state,
          curCombo: state.combinations[firstIdx],
          curComboIdx: firstIdx,
        };
      } else {
        let nextComboIdx = 0;
        for (let i = 0; i < state.selected.length; ++i) {
          //finds the next idx of selected with the next highest value, and wraps around
          //this probably doesnt work( can be 0 which it sholdnt)
          if (state.selected[i] === (state.curComboIdx + 1) % (state.highestSelction + 1)) {
            nextComboIdx = i;
          }
        }
        return {
          ...state,
          curCombo: state.combinations[nextComboIdx],
          curComboIdx: nextComboIdx,
        };
      }
    } case TOGGLE_RANDOM: {
      return {
        ...state,
        random: !state.random,
      };
    } case CLEAR_CUR_COMBO: {
      return {
        ...state,
        curCombo: {},
        curComboIdx: -1,
      };
    }
    default:
      return state;
  }
};
