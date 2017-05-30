import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';

import RecipesReducer from './reducer-recipes';
import SearchReducer from './reducer-search';

const rootReducer = combineReducers({
  recipes: RecipesReducer,
  search: SearchReducer,
});

export default rootReducer;
