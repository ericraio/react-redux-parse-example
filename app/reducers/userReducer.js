import * as types from '../constants/userActionTypes';
import  { Record } from 'immutable';
import Parse from 'parse';

const InitialState = Record({
  state: null,
  isRequesting: false,
  isRemembered: false,
  isNormalUser: true,
  code: null,
  error: null,
  message: null,
  current: null,
  list: []
});

export default function userReducer(state = new InitialState, action) {

  switch (action.type) {
    case types.LOGIN_REQUEST:
    case types.LOGIN_SUCCESS:
    case types.LOGIN_FAILURE:
    case types.FORGOT_PASSWORD_REQUEST:
    case types.FORGOT_PASSWORD_SUCCESS:
    case types.FORGOT_PASSWORD_FAILURE:
    case types.REMEMBER_ME:
      state = state.set('state', action.type);

    case types.LOGIN_SUCCESS:
      return state.set('isRequesting', false)
                  .set('current', action.payload);

    case types.LOGIN_REQUEST:
    case types.FORGOT_PASSWORD_REQUEST:
      return state.set('isRequesting', true)
                  .set('error', null);

    case types.FORGOT_PASSWORD_SUCCESS:
      return state.set('isRequesting', false);

    case types.SET_PERMISSION_TYPE:
      return state.set('isNormalUser', action.payload);

    case types.LOGIN_FAILURE:
    case types.FORGOT_PASSWORD_FAILURE:
      return state.set('isRequesting', false)
                  .set('code', action.payload.code)
                  .set('error', action.payload.error)
                  .set('message', action.payload.message);

    case types.REMEMBER_ME:
      return state.set('isRemembered', action.payload);

  default:
    return state;
  }
}
