'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

/**
 * Project actions
 */
import * as userActions from '../actions/userActions';

const actions = [
  userActions
];

function mapStateToProps(state) {
  return { ...state };
};

function mapDispatchToProps(dispatch) {
  const creators = new Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

export default function connectProps(ConnectedComponent) {
  ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ConnectedComponent);

  class Connection extends Component {

    render() {
      return (
        <ConnectedComponent {...this.props} {...this.state} />
      );
    }
  };

  return connect(mapStateToProps, mapDispatchToProps)(Connection);
}
