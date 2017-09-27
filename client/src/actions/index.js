import axios from 'axios';

// const ROOT_URL = 'http://localhost:3000/api';
const ROOT_URL = '/api';

export const FETCH_RECIPES = 'FETCH_RECIPES';
export const FETCH_MORE_RECIPES = 'FETCH_MORE_RECIPES';
export const FETCH_RECIPE = 'FETCH_RECIPE';
export const SET_SEARCH = 'SET_SEARCH';

export function fetchRecipes(search = '', callback) {
  const request = axios.get(`${ROOT_URL}/recipes?search=${search}&offset=0`)
  .then((response) => {
    callback();
    return response;
  });

  return {
    type: FETCH_RECIPES,
    payload: request,
  };
}

// clean up the way offset is implemented in this action

export function fetchMoreRecipes(offset = 0, search = '') {
  const request = axios.get(`${ROOT_URL}/recipes?offset=${offset}&search=${search}`);

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

export function setSearch(search) {
  return {
    type: SET_SEARCH,
    payload: search,
  };
}
