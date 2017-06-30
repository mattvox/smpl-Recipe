import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Masonry from 'react-masonry-component';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from 'halogen/SyncLoader';
import { Grid } from 'semantic-ui-react';

import { fetchRecipes, fetchMoreRecipes, setSearch } from '../actions/index';

import RecipeCard from './recipe-card';

const cardStyle = {
  marginLeft: '5px',
  marginRight: '5px',
  width: '220px',
};

const masonryContainer = {
  margin: '0 auto',
};

const masonryOptions = {
  columnWidth: 250,
  fitWidth: true,
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
      this.props.fetchRecipes(this.props.location.query.search, () => {
        console.log('done loading');
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const search = this.props.location.query.search;
    const nextSearch = nextProps.location.query.search;

    if (this.props.recipes.length !== 0) {
      if (search !== nextSearch) {
        this.props.fetchRecipes(nextSearch, () => {
          this.props.setSearch(nextSearch);
          this.setState({
            offset: nextProps.recipes.length,
          });
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

    this.setState({
      offset: nextProps.recipes.length,
    });
  }

  renderMasonry() {
    const search = this.props.location.query.search;

    return (
      <InfiniteScroll
        hasMore={this.state.hasMore}
        loadMore={() => {
          setTimeout(() => {
            this.props.fetchMoreRecipes(this.state.offset, search);
          }, 500);
        }}
        loader={<div><Loader color='#333' /></div>}
        useWindow
      >
        <Grid centered>
          <Grid.Row columns={1}>
            <Grid.Column width={12}>
              <Masonry
                style={masonryContainer}
                elementType={'div'}
                options={masonryOptions}
              >
                {this.renderRecipes()}
              </Masonry>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </InfiniteScroll>
    );
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
    if (this.props.recipes.length === 0) {
      return <div>LOADING...</div>;
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
