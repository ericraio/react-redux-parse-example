import React, { Component, PropTypes } from 'react';
import connectProps from '../utils/connectProps';
import { Link } from 'react-router';
import './Application.scss';

class Application extends Component {

  displayResources() {
    if(this.props.user.get('isNormalUser')) {
      return (
        <li role="navigation" className={this.props.location.pathname === `/resources` ? 'active' : ''}><Link to={`/resources`}>Resources</Link></li>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <main>
        <div id="main" class="container">
          {this.props.children}
        </div>
      </main>
    );
  }
}

export default connectProps(Application);
