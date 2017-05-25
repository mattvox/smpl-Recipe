import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Masonry from 'react-masonry-component';

import { fetchRecipes } from '../actions/index';

const containerStyle = {
  textAlign: 'center',
  marginTop: '20px',
};

const cardStyle = {
  marginLeft: '0px',
  marginRight: '0px',
  // border: '2px solid',
};

const divStyle = {
  marginBottom: '20px',
  padding: '10px',
  border: '1px solid gray',
  textAlign: 'left',
};

const imgStyle = {
  width: '100%',
  textAlign: 'center',
};

class Recipes extends Component {
  componentWillMount() {
    this.props.fetchRecipes();
  }

  renderRecipes() {
    return this.props.recipes.map((recipe) => {
      return (
        <div className='col-sm-4' key={recipe.id} style={cardStyle}>
          <Link to={`recipes/${recipe.id}`}>
            <div style={divStyle}>
              <div>{recipe.title}</div>
              <img src={recipe.image_url} style={imgStyle} alt={`img${recipe.id}`} />
            </div>
          </Link>
        </div>
      );
    });
  }

  render() {
    return (
      <div className='col-sm-10 col-sm-offset-1' style={containerStyle}>
        <Masonry
          elementType={'div'}
        >
          {this.renderRecipes()}
        </Masonry>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { recipes: state.recipes.recipes };
}

export default connect(mapStateToProps, { fetchRecipes })(Recipes);
