import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';

import RecipesReducer from './reducer-recipes';
import SearchReducer from './reducer-search';
import OffsetReducer from './reducer-offset';

const rootReducer = combineReducers({
  recipes: RecipesReducer,
  search: SearchReducer,
  offset: OffsetReducer,
});

export default rootReducer;
