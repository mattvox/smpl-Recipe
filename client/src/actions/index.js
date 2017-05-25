import axios from 'axios';

const ROOT_URL = 'http://localhost:3000/api';

export const FETCH_RECIPES = 'FETCH_RECIPES';
export const FETCH_MORE_RECIPES = 'FETCH_MORE_RECIPES';
export const FETCH_RECIPE = 'FETCH_RECIPE';

export function fetchRecipes() {
  const request = axios.get(`${ROOT_URL}/recipes`);

  return {
    type: FETCH_RECIPES,
    payload: request,
  };
}

export function fetchMoreRecipes(offset) {
  const request = axios.get(`${ROOT_URL}/recipes?offset=${offset}`);

  return {
    type: FETCH_MORE_RECIPES,
    payload: request,
  };
}

export function fetchRecipe(id) {
  const request = axios.get(`${ROOT_URL}/recipes/${id}`);
  // then()
  return {
    type: FETCH_RECIPE,
    payload: request,
  };
}
