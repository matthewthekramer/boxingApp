/*
 * This reducer keeps track of the current state for combination workouts
 */
 import {
   ADD_COMBO,
   REMOVE_COMBO,
   DESELECT_COMBOS,
   TOGGLE_SELECT_COMBO,
   NEXT_COMBO,
   TOGGLE_RANDOM,
   CLEAR_CUR_COMBO,
   UPDATE_COMBO,
 } from '../actions/types';
 import { types } from '../util/PunchNameToImg';

 const INITIAL_STATE = {
   /* holds all combinations the user has saved
    * each combo contains:
    * name, array of of in order pairs of punches and speeds
    */
   combinations: [
     {
       name: '1-2-3',
       punches: [
         {
           name: types[0],
           speed: 5,
         },
         {
           name: types[1],
           speed: 4,
         },
         {
           name: types[2],
           speed: 3,
         },
       ],
     },
     {
       name: 'Double Jab Cross',
       punches: [
         {
           name: types[0],
           speed: 5,
         },
         {
           name: types[0],
           speed: 5,
         },
         {
           name: types[1],
           speed: 3,
         },
       ]
     },
     {
       name: '2-3-2',
       punches: [
         {
           name: types[1],
           speed: 3
         },
         {
           name: types[2],
           speed: 3
         },
         {
           name: types[1],
           speed: 3
         },
       ]
     }
   ],
   //each element corresponds to an element in combinations, number determines order
   //element contains 0 if not selected | Example: [1, 3, 0, 2] means the user has
   //selected in order the first combo, the fourth combo, and the second combo
   selected: [1, 0, 0],
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
      const newCombos = state.combinations.slice();
      const newSelected = state.selected.slice();
      newCombos.push(action.payload.combo);
      newSelected.push(-1);
      return {
        ...state,
        combinations: newCombos,
        selected: newSelected,
      };
    //should only happen when nothing is selected
    } case UPDATE_COMBO: {
      const newCombinations = state.combinations.slice();
      newCombinations[action.payload.idx] = action.payload.combo;
      return {
        ...state,
        combinations: newCombinations,
      };
    } case REMOVE_COMBO: {
      const newCombinations = state.combinations.slice(0, action.payload.idx).concat(
          state.combinations.slice(
            action.payload.idx + 1, state.combinations.length));
      const newSelected = state.selected.slice(0, action.payload.idx).concat(
          state.selected.slice(
            action.payload.idx + 1, state.selected.length));
      return {
        ...state,
        combinations: newCombinations,
        selected: newSelected,
      };
    //sets selection for all combos to 0
    } case DESELECT_COMBOS: {
      return {
        ...state,
        selected: state.selected.fill(0),
      };
    /*
     * Either selects or deselects a combo keeping the order of selection in mind
     * payload:
     *  idx: index of the combination to select
     */
   } case TOGGLE_SELECT_COMBO: {
      //does nothing if selected has nothing and combinations has bad length
      if (state.selected === [] || state.combinations.length <= action.payload.idx) {
        return state;
      }
      console.log('before:', state.selected);
      const newSelected = state.selected.slice();
      //if selected, deselect it
      if (newSelected[action.payload.idx] > 0) {
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
        console.log('deselecting', newSelected);
        return {
          ...state,
          selected: newSelected,
          highestSelection: state.highestSelection - 1,
        };
      } else {
        newSelected[action.payload.idx] = state.highestSelection + 1;
        console.log('selecting', newSelected);
        return {
          ...state,
          selected: newSelected,
          highestSelection: state.highestSelection + 1,
        };
      }
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
          curCombo: Object.assign({}, state.combinations[firstIdx]),
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
          curCombo: Object.assign({}, state.combinations[nextComboIdx]),
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
