/* eslint-disable camelcase */
export const ActionTypes = { // keys for actiontypes
  DELETE_BOOK: 'DELETE_BOOK', // Action types
  NEW_BOOK: 'NEW_BOOK',
  UPDATE_BOOK: 'UPDATE_BOOK',
  GET_ALL: 'GET_ALL',
  GET_BOOK: 'GET_BOOK',
  USERNAME: 'USERNAME',
  ERROR: 'ERROR',
  CLEAN_ERROR: 'CLEAN_ERROR',
  SET_PAGE: 'SET_PAGE',
  SET_ID: 'SET_ID',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

const axios = require('axios'); // Require axios for script

// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'http://lab4-backend.herokuapp.com/api';
// const ROOT_URL = 'https://platform.cs52.me/api';
const API_KEY = 'g_andreine';

export function getBook(book_id) { // Gets specific book
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${book_id}?key=${API_KEY}`) // Goes to specified Path
      .then((response) => { // Dispenses Redux Action with Data
        dispatch({ type: ActionTypes.GET_BOOK, payload: response.data });
      })
      .catch((error) => { // have an error component somewhere show it <- Tims Idea...
        dispatch({ type: ActionTypes.ERROR, error }); // might you also want an ERROR_CLEAR action?
      });
  };
}

export function putBook(book_id, updated_book, history) { // Updates a book
  const path = history.location.pathname.split('/');
  const new_path = `${path[0]}/${path[1]}/${path[2]}/`; // Makes path to sub dir
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${book_id}?key=${API_KEY}`, updated_book, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => { // once we are done fetching we can dispatch a redux action with the response data
        dispatch({ type: ActionTypes.UPDATE_BOOK, payload: response.data });
      })
      .then((response) => {
        this.getBook(book_id); // Gets specific book and gets all other books to create page update
      })
      .then((response) => {
        this.getAllBooks();
      })
      .then((response) => {
        history.push(new_path); // pushes them onto the sub dir path
      })
      .catch((error) => { // have an error component somewhere show it
        console.log('Stuck');
        console.log(error);
        dispatch({ type: ActionTypes.ERROR, error }); // might you also want an ERROR_CLEAR action?
      });
  };
}

export function getAllBooks() { // Gets all books
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts?key=${API_KEY}`) // Goes to specified Path
      .then((response) => { // Dispenses Redux Action with Data
        dispatch({ type: ActionTypes.GET_ALL, payload: response.data });
      }).then()
      .catch((error) => { // have an error component somewhere show it <- Tims Idea...
        dispatch({ type: ActionTypes.ERROR, error }); // might you also want an ERROR_CLEAR action?
      });
  };
}

export function deleteBook(book_id, history) { // Deletes a book
  return (dispatch) => { // Thunk Method dispatch (the middleware)
    axios.delete(`${ROOT_URL}/posts/${book_id}?key=${API_KEY}`, { headers: { authorization: localStorage.getItem('token') } }) // Goes to specified Path
      .then((response) => { // Dispenses Redux Action with Data
        dispatch({ type: ActionTypes.DELETE_BOOK, payload: response.data });
        history.push('/'); // Not really sure what history does
      })
      .then((response) => {
        this.getAllBooks();
      })
      .catch((error) => { // have an error component somewhere show it <- Tims Idea...
        dispatch({ type: ActionTypes.ERROR, error }); // might you also want an ERROR_CLEAR action?
      });
  };
}

export function postBook(book, tag) { // Makes a new book
  return (dispatch) => {
    const newBook = { ...book, username: tag };
    axios.post(`${ROOT_URL}/posts?key=${API_KEY}`, newBook, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.NEW_BOOK, payload: null });
      })
      .then((response) => {
        this.getAllBooks();
      })
      .catch((error) => { // have an error component somewhere show it <- Tims Idea...
        dispatch({ type: ActionTypes.ERROR, error }); // might you also want an ERROR_CLEAR action?
      });
  };
}

export function setPage(data) { // sets curent page with data associated with it
  return {
    type: ActionTypes.SET_PAGE,
    payload: data,
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signinUser(object1, history) {
  const newObject = { // takes in an object with email and password (minimal user object)
    password: object1.password,
    email: object1.email,
    username: object1.username,
  };
  return (dispatch) => { // returns a thunk method that takes dispatch as an argument (just like our create post method really)
    axios.post(`${ROOT_URL}/signin`, newObject) // does an axios.post on the /signin endpoint
      .then((result) => {
        dispatch({ type: ActionTypes.AUTH_USER }); // On success dispatch({ type: ActionTypes.AUTH_USER });
        localStorage.setItem('token', result.data.token); // Store token locally
        history.push('/'); // Pushes to main route
      })
      .then((result) => {
        dispatch({ type: ActionTypes.USERNAME, payload: object1.username });
        localStorage.setItem('username', object1.username);
      })
      .catch((error) => { // On error should dispatch(authError(`Sign In Failed: ${error.response.data}`));
        dispatch(authError(`Sign In Failed: ${error.response.data}`));
      });
  };
}

export function setUsername(data) {
  return {
    type: ActionTypes.USERNAME,
    payload: data,
  };
}

export function signupUser(object1, history) {
  // takes in an object with email and password (minimal user object)
  const newObject = {
    password: object1.password,
    email: object1.email,
    username: object1.username,
  };
  return (dispatch) => { // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signup endpoint (only difference from above)
    axios.post(`${ROOT_URL}/signup`, newObject)
      .then((result) => { // on success does: dispatch({ type: ActionTypes.AUTH_USER });
        dispatch({ type: ActionTypes.AUTH_USER });
        localStorage.setItem('token', result.data.token); // sets local storage
        history.push('/');
      })
      .then((result) => {
        dispatch({ type: ActionTypes.USERNAME, payload: object1.username });
        localStorage.setItem('username', object1.username);
      })
      .catch((error) => { // On error should dispatch(authError(`Sign In Failed: ${error.response.data}`));
        dispatch(authError(`Sign Up Failed: ${error.response.data}`));
      }); // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}
