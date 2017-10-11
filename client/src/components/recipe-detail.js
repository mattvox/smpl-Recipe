/*
TODO

- Style this and break out individual pieces to separate components
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchRecipe } from '../actions/index';

class RecipeDetail extends Component {
  componentDidMount() {
    this.props.fetchRecipe(this.props.params.id);
  }

  renderIngredients() {
    return this.props.recipe.data.ingredients.map((ingredient) => {
      return (
        <li key={ingredient}>{ingredient}</li>
      );
    });
  }

  renderMethods() {
    return this.props.recipe.data.methods.map((method) => {
      return (
        <li key={method}>{method}</li>
      );
    });
  }

  render() {
    const { recipe } = this.props;

    if (!this.props.recipe.data) {
      return <div>Loading...</div>;
    }

    return (
      <div className='col-sm-8 col-sm-offset-2'>
        <Link to='/'>Back to Home</Link>
        <h3>{recipe.data.title}</h3>
        <h6>{recipe.data.description}</h6>
        <img src={recipe.data.image_url} alt={recipe.data.title} />
        <p>Difficulty: {recipe.data.difficulty}</p>
        <p>Servings: {recipe.data.servings}</p>
        <p>Ingredients:</p>
        <ul>
          {this.renderIngredients()}
        </ul>
        <p>Methods:</p>
        <ol>
          {this.renderMethods()}
        </ol>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  { recipe: state.recipes.activeRecipe }
);

export default connect(mapStateToProps, { fetchRecipe })(RecipeDetail);
