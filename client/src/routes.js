import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Recipes from './components/recipes';
import RecipeDetail from './components/recipe-detail';


export default (
  <Route path='/' component={App}>
    <IndexRoute component={Recipes} />
    <Route path='recipes/:id' component={RecipeDetail} />
  </Route>
);
