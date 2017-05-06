import React, { Component } from 'react';

import { connect } from 'react-redux'

import Course from '../Course';

class CourseContainer extends Component {
  render() {
    return <Course>
      {this.props.test}
    </Course>
  }
}

export default connect(store => {
  return {
    test: store.main,
  }
})(CourseContainer);