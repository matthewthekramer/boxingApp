const FRONT_JAB = 'front-jab';
const REAR_STRAIGHT = 'rear-straight';
const FRONT_HOOK = 'front-hook';
const REAR_UPPERCUT = 'rear-uppercut';
const FRONT_UPPERCUT = 'front-uppercut';

export const types = [
  FRONT_JAB,
  REAR_STRAIGHT,
  FRONT_HOOK,
  REAR_UPPERCUT,
  FRONT_UPPERCUT,
];

//given a punch name from types, returns path to an image
export default (punchName) => {
  switch (punchName) {
    case FRONT_JAB: {
      return require('../../assets/images/front-jab.jpg');
    } case REAR_STRAIGHT: {
      return require('../../assets/images/rear-straight.jpg');
    } case FRONT_HOOK: {
      return require('../../assets/images/front-hook.jpg');
    } case REAR_UPPERCUT: {
      return require('../../assets/images/rear-uppercut.jpg');
    } case FRONT_UPPERCUT: {
      return require('../../assets/images/front-uppercut.jpg');
    }
    default:
  }
};
