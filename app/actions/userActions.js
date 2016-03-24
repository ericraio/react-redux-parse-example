import * as types from '../constants/userActionTypes';
import Parse, { User } from 'parse';
import { push, replace } from 'react-router-redux';
import cookie from 'react-cookie';

const REMEMBER_ME_TIMER = 2592000; // 30 days
const DEFAULT_SESSION_TIMER = 3600; // 1 hour

function loginRequest() {
  return {
    type: types.LOGIN_REQUEST
  };
}

function loginSuccess(user) {
  return {
    type: types.LOGIN_SUCCESS,
    payload: user
  };
}

function loginFailure(error) {
  return {
    type: types.LOGIN_FAILURE,
    payload: error
  };
}

function logoutRequest() {
  return {
    type: types.LOGOUT_REQUEST
  };
}

function logoutSuccess(user) {
  return {
    type: types.LOGOUT_SUCCESS
  };
}

function logoutFailure(error) {
  return {
    type: types.LOGOUT_FAILURE,
    payload: error
  };
}

function forgotPasswordRequest() {
  return {
    type: types.FORGOT_PASSWORD_REQUEST
  };
}

function forgotPasswordSuccess() {
  return {
    type: types.FORGOT_PASSWORD_SUCCESS
  };
}

function forgotPasswordFailure(error) {
  return {
    type: types.FORGOT_PASSWORD_FAILURE,
    payload: error
  };
}

function setRememberMe(isRemembered) {
  let timer = isRemembered ? REMEMBER_ME_TIMER : DEFAULT_SESSION_TIMER;
  cookie.save('sessionTimer', true, { maxAge: timer });

  return {
    type: types.REMEMBER_ME,
    payload: isRemembered
  };
}

function setPermissionType(user) {
  let permissionType = Parse.User.current().get("permissionType");
  let isNormalUser = (permissionType === undefined || permissionType == null || permissionType == "" || permissionType == "0" || permissionType == "n" || permissionType == "normal");

  return {
    type: types.SET_PERMISSION_TYPE,
    payload: isNormalUser
  };
}

export function login(email, password, rememberMe = false) {
  return dispatch => {
    dispatch(loginRequest());

    User.logIn(email, password, {
      success(user) {
        dispatch(loginSuccess(user.toJSON()));
        dispatch(setRememberMe(rememberMe));
        dispatch(setPermissionType(user));
        dispatch(replace('/profile'));
      },

      error(user, error) {
        dispatch(loginFailure(error));
      }
    });
  };
}

export function logout() {
  return dispatch => {
    window.localStorage.clear();
    dispatch(logoutRequest());
    let promise = User.logOut();
    promise
    .done(function() {
      dispatch(logoutSuccess());
    })
    .fail(function() {
      dispatch(logoutFailure());
    });
  };
}

export function forgotPassword(email) {
  return dispatch => {
    dispatch(forgotPasswordRequest());
    Parse.User.requestPasswordReset(email, {
      success() {
        dispatch(forgotPasswordSuccess());
        dispatch(push('/login'));
      },

      error(error) {
        dispatch(forgotPasswordFailure(error));
      }
    });
  };
}
