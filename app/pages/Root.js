import React, { Component, PropTypes } from 'react';
import connect from '../utils/connect';
import {  push } from 'react-router-redux';

class Root extends Component {

  render() {
    const { dispatch, user } = this.props;

    this.props.user.get('current');

    if (user.get('current')) {
      dispatch(push('/profile'));
    } else {
      dispatch(push('/login'));
    }

    return null;
  }

}

export default connect(Root);
