import { ActionTypes } from '../actions';

const initialState = { // initial state of books that can be accessed via props.books.__insert-thingy__
  authenticated: false,
  username: null,
};

const AuthReducer = (state = initialState, action) => { // Auth actions to determine value
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { ...state, authenticated: true };
    case ActionTypes.DEAUTH_USER:
      return { ...state, authenticated: false };
    case ActionTypes.AUTH_ERROR:
      return { ...state, authenticated: false };
    case ActionTypes.USERNAME:
      return { authenticated: true, username: action.payload };
    default:
      return state;
  }
};

export default AuthReducer;
