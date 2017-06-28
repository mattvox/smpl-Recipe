import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Masonry from 'react-masonry-component';
import InfiniteScroll from 'react-infinite-scroller';

import { fetchRecipes, fetchMoreRecipes, setSearch } from '../actions/index';

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
      hasMore: true,
    };
  }

  componentDidMount() {
    if (this.props.recipes.length === 0) {
      this.props.fetchMoreRecipes(this.state.offset, this.props.location.query.search);
    }
  }

  componentWillReceiveProps(nextProps) {
    const search = this.props.location.query.search;
    const nextSearch = nextProps.location.query.search;

    if (this.props.recipes.length !== 0) {
      if (search !== nextSearch) {
        this.props.fetchRecipes(nextSearch, () => {
          this.props.setSearch(nextSearch);
        });
      }

      if (this.props.recipes.length === nextProps.recipes.length) {
        this.setState({
          hasMore: false,
        });
      } else {
        this.setState({
          hasMore: true,
        });
      }
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

  renderMasonry() {
    const search = this.props.location.query.search;
    this.state.offset += 12;

    return (
      <div className='col-sm-10 col-sm-offset-1' style={containerStyle}>
        <InfiniteScroll
          hasMore={this.state.hasMore}
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

  render() {
// if isLoading render spinner else do below
    if (this.props.recipes.length === 0) {
      return <div>loading...</div>;
    // eslint-disable-next-line
    } else {
      return this.renderMasonry();
    }
  }
}

function mapStateToProps(state) {
  return {
    recipes: state.recipes.recipes,
    search: state.search.search,
    offset: state.offset.offset,
  };
}

export default connect(mapStateToProps, { fetchRecipes, fetchMoreRecipes, setSearch })(Recipes);
