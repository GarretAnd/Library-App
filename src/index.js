import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/app';
import { ActionTypes } from './actions';

// this creates the store with the reducers, and does some other stuff to initialize devtools
// boilerplate to copy, don't have to know
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk), // Add in thunk
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

// we now wrap App in a Provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main'),
);

if (window.performance) { // On Reload
  if (performance.navigation.type === 1) {
    console.log(window.location.assign(window.location.origin)); // Push to Origin
  }
}

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: ActionTypes.AUTH_USER });
}

const name = localStorage.getItem('username');
if (name) {
  store.dispatch({ type: ActionTypes.USERNAME, payload: name });
}
