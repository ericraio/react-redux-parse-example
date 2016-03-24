import React, { Component, PropTypes } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import connectProps from '../utils/connectProps';
import { Link } from 'react-router';
import './LoginForm.scss';

class LoginForm extends Component {

  handleSubmit(e) {
    e.preventDefault();
    let email = findDOMNode(this.refs.email).value;
    let password = findDOMNode(this.refs.password).value;
    let rememberMe = findDOMNode(this.refs.remember).checked
    this.props.actions.login(email, password, rememberMe);
    document.querySelector('.login-form').reset();
  }

  render() {
    return (
      <div className="row">
        <div className="login-box" className="col-md-12">
          <form method="post" className="login-form">
            <div className="input-group margin-bottom-sm">
              <span className="input-group-addon"><i className="fa fa-envelope-o fa-fw"></i></span>
              <input ref="email" type="email" id="email" name="email" className="form-control" maxLength="100" placeholder="Email address" />
            </div>
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-unlock fa-fw"></i></span>
              <input ref="password" id="password" name="password" className="form-control" type="password" placeholder="Password"/>
            </div>

            <div className="remember">
              <input ref="remember" id="remember" name="remember" type="checkbox" defaultChecked={true} />
              <label htmlFor="remember">Remember me!</label>
            </div>
            <div className="forgot">
              <Link to={`/forgot-password`}>Forgot password?</Link>
            </div>
            <div className="actions">
              <button type="submit" className="btn btn-primary col-md-12" onClick={::this.handleSubmit}>Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connectProps(LoginForm);
