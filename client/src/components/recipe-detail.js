import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchRecipe } from '../actions/index';

class RecipeDetail extends Component {
  componentWillMount() {
    this.props.fetchRecipe(this.props.params.id);
  }

  renderIngredients() {
    return this.props.recipe.data.ingredients.map((ingredient) => {
      return (
        <li>{ingredient}</li>
      );
    });
  }

  renderMethods() {
    return this.props.recipe.data.methods.map((methods) => {
      return (
        <li>{methods}</li>
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
        <p>
          Ingredients:
          <ul>
            {this.renderIngredients()}
          </ul>
        </p>
        <p>
          Methods:
          <ol>
            {this.renderMethods()}
          </ol>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  { recipe: state.recipes.activeRecipe }
);

export default connect(mapStateToProps, { fetchRecipe })(RecipeDetail);
