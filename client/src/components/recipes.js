import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Masonry from 'react-masonry-component';
import InfiniteScroll from 'react-infinite-scroller';

// import MasonryInfiniteScroller from 'react-masonry-infinite';

import { fetchMoreRecipes } from '../actions/index';

import RecipeCard from './recipe-card';

const containerStyle = {
  textAlign: 'center',
  marginTop: '10px',
};

const cardStyle = {
  marginLeft: '10px',
  marginRight: '10px',
  width: '220px',
};

class Recipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
    };
  }

  componentDidMount() {
    if (this.props.recipes.length === 0) {
      console.log(this.state, "STATE");
      this.props.fetchMoreRecipes(this.state.offset, this.props.location.query.search);
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
// if isLoading render spinner else do below
    const search = this.props.location.query.search;
    this.state.offset += 12;

    if (this.props.recipes.length === 0) {
      return <div>loading...</div>;
    } else {
      return (
        <div className='col-sm-10 col-sm-offset-1' style={containerStyle}>
          <InfiniteScroll
            hasMore
            loadMore={() => {
              setTimeout(() => {
                this.props.fetchMoreRecipes(this.state.offset, search);
              }, 500);
            }}
            loader={<div className='loader'>Loading ...</div>}
            useWindow
          >
            <Masonry elementType={'div'}>
              {this.renderRecipes()}
            </Masonry>
          </InfiniteScroll>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    recipes: state.recipes.recipes,
    search: state.search.search };
}

export default connect(mapStateToProps, { fetchMoreRecipes })(Recipes);
