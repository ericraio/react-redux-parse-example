import React, { Component, PropTypes } from 'react';
import connect from '../utils/connect';
import { push } from 'react-router-redux';

class Logout extends Component {

  componentDidMount() {
    const { actions, dispatch } = this.props;
    actions.logout();
    dispatch(push('/login'));
  }

  render() {
    return null;
  }

}

export default connect(Logout);
