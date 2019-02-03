//This reduces handles the state for when a user is creating or updating a combination
//the user can add punches, change the order, create a name, etc
import {
  SET_NAME,//TODO add these in types
  ADD_PUNCH,
  SWITCH_PUNCH,
  SET_SPEED,
  SET_PUNCH_NAME,
  REMOVE_PUNCH,
} from '../actions/types';

//just contains the combo that the user is currently updating/editing
const INITIAL_STATE = {
  name: '',
  punches: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_NAME: {
      return { ...state, name: action.payload.name };
    }
    case ADD_PUNCH: {
      return { ...state, punches: state.punches.concat([action.payload.punch]) };
    }
    //  used to switch the order of two punches
    //payload:
    //  idx1: first index to swap
    // idx2: 2nd index to swap
    case SWITCH_PUNCH: {
      const { idx1, idx2 } = action.payload;
      const newPunches = state.punches.slice();
      const tempPunch = newPunches[idx1];
      newPunches[idx1] = newPunches[idx2];
      newPunches[idx2] = tempPunch;
      return { ...state, punches: newPunches };
    }
    /*
     * Sets the name of a punch given the index
     * payload:
     *  idx: index in punches of the punch to update
     *  name: new name for the punch
     */
    case SET_PUNCH_NAME: {
      const newPunch = state.punches[action.payload.idx];
      newPunch.name = action.payload.speed;
      const newPunches = state.punches.slice();
      newPunches[action.payload.idx] = newPunch;
      return { ...state, punches: newPunches };
    }
    /*
     * sets the speed of a certain punch
     * payload:
     *  idx: index in punches of the punch to update
     *  speed: new speed for the punch
     */
    case SET_SPEED: {
      const newPunch = state.punches[action.payload.idx];
      newPunch.speed = action.payload.speed;
      const newPunches = state.punches.slice();
      newPunches[action.payload.idx] = newPunch;
      return { ...state, punches: newPunches };
    }
    /*
     * Removes a punch from the combination
     * payload:
     *  idx: index in punches of the punch to delete
     */
    case REMOVE_PUNCH: {
      const newPunches = state.punches.slice(0, action.payload.idx)
        .concat(state.punches.slice(action.payload.idx + 1, state.punches.length));
      return { ...state, punches: newPunches };
    }
    default:
      return state;
  }
};
