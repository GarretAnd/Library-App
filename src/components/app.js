/* eslint-disable react/no-unescaped-entities */
/* eslint-disable new-cap */
/* eslint-disable import/no-named-as-default-member */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import {
  getAllBooks, getBook, postBook, signoutUser,
} from '../actions';
import Dictionary from './dictionary';
import Nav from './nav';
import BookMaker from './bookMaker';
import SignIn from './signin';
import '../style.scss'; // Lots O' Imports

const Welcome = (props) => { // Welcome Screen
  return (
    <div className="hello">
      <div className="intro">
        Welcome to Garret's Library!
      </div>
      <div className="midtro">
        Create a book! Read a book! Update a book! Destroy a book!
      </div>
      <div className="outro">
        Use the shelf to select a book or make a book with the bar above!
      </div>
    </div>
  );
};

const FallBack = (props) => { // In case there is nothing found
  return <div className="error">URL Not Found</div>;
};

class App extends Component { // The display for the main page
  constructor(props) {
    super(props);
    this.state = {
      renderMe: 'I serve literally no purpose', // So I could have it as a class component without errors :)
    };
  }

  componentDidMount() { // Gets all books in DB on call from Reducer
    this.props.getAllBooks();
  }

  addBook = (bookObj) => {
    this.props.postBook(bookObj, this.props.username); // Sends new book and calls reload of books to make new Map for links
    this.setState({ renderMe: `${bookObj.title}` });
  }

  pickBook = (id) => { // Get's the book
    this.props.getBook(id);
  }

  render() {
    return ( // Returns a router with a list of all possible books you could open
      <div>
        <div className="adder">
          <BookMaker authorize={this.props.auth} makeBook={this.addBook} usern={this.props.username} />
        </div>
        <Router>
          <div className="main-nav">
            <div className="nav-links">
              <Nav booksList={this.props.booksList}
                signo={this.props.signoutUser}
                autho={this.props.auth}
                selected={this.pickBook}
                dummy={this.state.renderMe}
              />
            </div>
            <div className="display-route">
              <Switch>
                <Route exact path="/" component={Welcome} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/signup" component={SignIn} />
                <Route exact path="/book/:id" component={Dictionary} />
                <Route component={FallBack} />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({ // Connects booksList to our Redux Prop books.list
  booksList: reduxState.books.list,
  selectedBook: reduxState.books.selected,
  auth: reduxState.auth.authenticated,
  username: reduxState.auth.username,
});

export default connect(mapStateToProps, {
  getAllBooks, getBook, postBook, signoutUser,
})(App); // Connects Props and Reducer Actions to Component
