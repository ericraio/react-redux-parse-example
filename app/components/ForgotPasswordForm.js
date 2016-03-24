import React, { Component, PropTypes } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import connectProps from '../utils/connectProps';
import { Link } from 'react-router';
import './ForgotPasswordForm.scss';

class ForgotPasswordForm extends Component {

  handleSubmit(e) {
    e.preventDefault();
    let email = findDOMNode(this.refs.email).value;
    this.props.actions.forgotPassword(email);
    document.querySelector('.forgot-password-form').reset();
  }

  render() {
    return (
      <div className="row">
        <div className="forgot-password-box" className="col-md-12">
          <form method="post" className="forgot-password-form">
            <div className="input-group margin-bottom-sm">
              <span className="input-group-addon"><i className="fa fa-envelope-o fa-fw"></i></span>
              <input ref="email" type="email" id="email" name="email" className="form-control" maxLength="100" placeholder="Email address" />
            </div>

            <div className="actions">
              <button type="submit" className="btn btn-primary col-md-12" onClick={::this.handleSubmit}>ForgotPassword</button>
            </div>

            <div className="actions back-to-login">
              <Link to={`/login`}>Already have an account?</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connectProps(ForgotPasswordForm);
