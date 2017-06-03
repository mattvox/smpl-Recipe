import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Masonry from 'react-masonry-component';

import { fetchMoreRecipes } from '../actions/index';

import RecipeCard from './recipe-card';

const containerStyle = {
  textAlign: 'center',
  marginTop: '20px',
};

const cardStyle = {
  marginLeft: '0px',
  marginRight: '0px',
};

class Recipes extends Component {
  componentWillMount() {
    if (this.props.recipes.length == 0) {
      this.props.fetchMoreRecipes();
    }
  }

  renderRecipes() {
    return this.props.recipes.map((recipe) => {
      return (
        <div className='col-sm-3' key={recipe.id} style={cardStyle}>
          <Link to={`recipes/${recipe.id}`}>
            <RecipeCard
              title={recipe.title}
              image={recipe.image_url}
              id={recipe.id}
            />
          </Link>
        </div>
      );
    });
  }

  render() {
    return (
      <div className='col-sm-10 col-sm-offset-1' style={containerStyle}>
        <Masonry elementType={'div'}>
          {this.renderRecipes()}
        </Masonry>
        <button>Hi</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { recipes: state.recipes.recipes };
}

export default connect(mapStateToProps, { fetchMoreRecipes })(Recipes);
