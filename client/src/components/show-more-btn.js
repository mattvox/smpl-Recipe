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
    // adds
    this.setState({
      offset: this.state.offset += 12,
    });

    this.props.fetchMoreRecipes(this.state.offset);
  }

  render() {
    return (
      <div style={style}>
        <div className='col-sm-4'>
          <button onClick={this.handleClick} className='btn btn-secondary'>
            Show More
          </button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMoreRecipes }, dispatch);
}

export default connect(null, mapDispatchToProps)(ShowMoreButton);
