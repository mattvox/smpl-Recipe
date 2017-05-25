import { FETCH_RECIPES, FETCH_MORE_RECIPES, FETCH_RECIPE } from '../actions/index';

const INITIAL_STATE = { recipes: [], activeRecipe: {} };

export default function (state = INITIAL_STATE, action) {
  let recipes = [];

  switch (action.type) {
    case FETCH_RECIPES:
      return { ...state, recipes: action.payload.data };

    case FETCH_MORE_RECIPES:
      recipes = state.recipes.concat(action.payload.data);
      return { ...state, recipes: recipes };

    case FETCH_RECIPE:
      return { ...state, activeRecipe: action.payload.data };

    default:
      return state;
  }
}
