import React, { Component } from 'react';
import connect from '../utils/connect';
import LoginForm from '../components/LoginForm';
import * as userTypes from '../constants/userActionTypes';
import './Login.scss';

class Login extends Component {

  message() {
    let message = null;
    let type = null;
    let user = this.props.user

    switch (user.get('state')) {
      case userTypes.LOGIN_FAILURE:
        type = 'warning';
        message = 'Email or password is incorrect. Try again.';
        break;
      case userTypes.FORGOT_PASSWORD_SUCCESS:
        type = 'success';
        message = 'An email has been sent to change your password.';
        break;
    }

    if (message) {
      return (
        <div className={"alert alert-" + type} role="alert">
          {message}
        </div>
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="login">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="login-box col-md-12">
              {this.message.bind(this)()}
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default connect(Login);
