// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';
import BookReducer from './book-reducer';
import AuthReducer from './auth-reducer';

const rootReducer = combineReducers({ // Combines all reducers
  books: BookReducer, // Reducer connector for books
  auth: AuthReducer,
});

export default rootReducer;
