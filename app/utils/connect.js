'use strict';

import React, { Component } from 'react';
import connectProps from './connectProps';

export default function connectApp(ConnectedComponent) {
  ConnectedComponent = connectProps(ConnectedComponent);

  class Connection extends Component {

    componentWillReceiveProps(props) {
    }

    render() {
      return (
        <ConnectedComponent />
      );
    }
  };

  return connectProps(Connection);
}
