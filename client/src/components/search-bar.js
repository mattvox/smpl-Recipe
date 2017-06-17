import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { fetchRecipes, setSearch } from '../actions';


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      term: event.target.value,
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();

    this.props.fetchRecipes(this.state.term);
    browserHistory.push(`/?search=${this.state.term}`);

    this.props.setSearch(this.state.term);

    this.setState({
      term: '',
    });
  }

  render() {
    return (
      <div className='col-sm-4 col-sm-offset-4'>
        <form onSubmit={this.handleFormSubmit} className='input-group'>
          <input
            placeholder='Search favorite recipes...'
            className='form-control'
            value={this.state.term}
            onChange={this.handleInputChange}
          />
          <span className='input-group-btn'>
            <button type='submit' className='btn btn-secondary'>
              Submit
            </button>
          </span>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { search: state.recipes.search };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRecipes, setSearch }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
