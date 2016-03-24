import React, { Component, PropTypes } from 'react';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import Parse from 'parse';
import Application from './components/Application';
import * as pages from './pages/index';
import * as reducers from './reducers/index';
import * as AppConfig from './constants/AppConfig';
import * as userTypes from './constants/userActionTypes';
import {persistStore, autoRehydrate} from 'redux-persist';
import reduxPersistImmutable from 'redux-persist-immutable';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { routerMiddleware } from 'react-router-redux';
import cookie from 'react-cookie';

Parse.initialize(AppConfig.ParseApplicationId, AppConfig.ParseJavaScriptKey);

const {
  Root,
  Login,
  ForgotPassword,
  About,
  Profile,
  Resources,
} = pages;

const browserHistory = createBrowserHistory();

const reducer = combineReducers({ ...reducers, routing: routerReducer });
const store = compose(autoRehydrate(), applyMiddleware(
  thunkMiddleware,
  routerMiddleware(browserHistory)
))(createStore)(reducer);

const history = syncHistoryWithStore(browserHistory, store)
const persistedStore = persistStore(store, {transforms: [reduxPersistImmutable]})

// If the session timer has expired,
// purge the state and the user will be forced to log in
if(!cookie.load('sessionTimer')) {
  store.dispatch({
    type: userTypes.REMEMBER_ME,
    payload: false
  })
  persistedStore.purgeAll();
}

function requireLoggedIn(nextState, replace) {
  if (!store.getState().user.get('current')) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function requireLoggedOut(nextState, replace) {
  if (store.getState().user.get('current')) {
    replace({
      pathname: '/profile',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

class App extends Component {
  render() {
    return (
      <Provider key="provider" store={store}>
        <Router history={history}>
          <Route path={`/`} component={Root} />
          <Route path={`/login`} component={Login} onEnter={requireLoggedOut} />
          <Route path={`/forgot-password`} component={ForgotPassword} onEnter={requireLoggedOut} />

          <Route component={Application} onEnter={requireLoggedIn}>
            <Route path={`/about`} component={About} />
            <Route path={`/resources`} component={Resources}>
            </Route>
            <Route path={`/profile`} component={Profile} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default App;
