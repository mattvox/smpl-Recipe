/*
TODO

- REMOVE THIS!!!
*/

import { SET_SEARCH } from '../actions/index';

const INITIAL_STATE = { search: '' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SEARCH:
      return { ...state, search: action.payload };

    default:
      return state;
  }
}
