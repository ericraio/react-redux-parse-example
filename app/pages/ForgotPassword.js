import React, { Component } from 'react';
import connect from '../utils/connect';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import * as userTypes from '../constants/userActionTypes';
import './ForgotPassword.scss';

class ForgotPassword extends Component {

  message() {
    let message = null;
    let type = null;
    let user = this.props.user

    switch (user.get('state')) {
      case userTypes.FORGOT_PASSWORD_FAILURE:
        type = 'warning';
        message = 'We are unable to look up that email. Try again.';
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
      <div className="forgot-password">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="forgot-password-box col-md-12">
              {this.message.bind(this)()}
              <ForgotPasswordForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(ForgotPassword);
