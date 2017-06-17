import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import Masonry from 'react-masonry-component';

import MasonryInfiniteScroller from 'react-masonry-infinite';

import { fetchMoreRecipes } from '../actions/index';

import RecipeCard from './recipe-card';

const containerStyle = {
  textAlign: 'center',
  marginTop: '20px',
};

const cardStyle = {
  marginLeft: '0px',
  marginRight: '0px',
  width: '200px',
};

class Recipes extends Component {
  componentDidMount() {
    if (this.props.recipes.length === 0) {
      this.props.fetchMoreRecipes();
    }
  }

  renderRecipes() {
    return this.props.recipes.map((recipe) => {
      return (
        <div key={recipe.id} style={cardStyle}>
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
        {/* <Masonry elementType={'div'}>
          {this.renderRecipes()}
        </Masonry> */}
        <MasonryInfiniteScroller
          hasMore={true}
          loadMore={() => this.props.fetchMoreRecipes()}
          useWindow={true}
          sizes={[
            { columns: 2, gutter: 10 },
            { mq: '768px', columns: 3, gutter: 10 },
            { mq: '1024px', columns: 4, gutter: 10 }
          ]}
        >
          {this.renderRecipes()}
        </MasonryInfiniteScroller>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { recipes: state.recipes.recipes };
}

export default connect(mapStateToProps, { fetchMoreRecipes })(Recipes);
