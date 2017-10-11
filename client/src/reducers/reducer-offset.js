/*
TODO

- REMOVE THIS!!!
*/

import { RESET_OFFSET } from '../actions/index';

const INITIAL_STATE = { offset: 0 };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET_OFFSET:
      return { ...state, offset: action.payload };

    default:
      return state;
  }
}
