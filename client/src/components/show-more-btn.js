import React, { Component } from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchMoreRecipes } from '../actions';


const style = {
  textAlign: 'center',
  padding: '20px',
  margin: '20px auto',
};

class ShowMoreButton extends Component {
  constructor(props) {
    super(props);

    this.state = { offset: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      offset: this.state.offset += 12,
    });

    let recipeCount = this.props.recipes.recipes.length;


    this.props.fetchMoreRecipes(this.props.search.search, this.state.offset);

    if ((recipeCount + 12) > this.props.recipes.recipes.length) {
      console.log(this.props.recipes.recipes.length);
      console.log("This button should be hidden");
    }
  }

  render() {
    return (
      <div style={style}>
        <div className='col-sm-4'>
          <button onClick={this.handleClick} className='{{}} btn btn-secondary'>
            Show More
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMoreRecipes }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowMoreButton);
