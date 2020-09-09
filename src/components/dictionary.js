/* eslint-disable camelcase */
/* eslint-disable new-cap */
/* eslint-disable import/no-named-as-default-member */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, NavLink, Switch, // useLocation,
} from 'react-router-dom';
import {
  getAllBooks, getBook, putBook, setPage,
} from '../actions';
import Page from './page';
import DeleteButton from './deleteButton';
import PageMaker from './pageMaker';
import Cover from './cover';
import '../style.scss'; // Lots O' Imports

const FallBack = (props) => { // In case there is nothing found
  return <div className="picker">Select A Page!</div>;
};

const Nav = (props) => { // Nav Bar with some style
  const JSON_parsed = JSON.parse(props.pageList); // Parses Json
  return ( // Has home bar
    <nav className="index">
      <ul>
        <li>
          <NavLink to={`${props.current_path}`}>Cover</NavLink>
        </li>
        {JSON_parsed.JSON_array.map((data, index) => { // Maps the links that exist to their proper route
          const passed_data = [data, index];
          return (
            <li key={`key_${data.title + index}`} onClick={(e) => { props.setter(passed_data); }}>
              <NavLink
                to={`${props.current_path}/page/${index}`} // Passes in the address for the link, a unique key (?), and the id
                id={index}
              >
                {data.title}
              </NavLink>
            </li>
          );
        }) }
      </ul>
    </nav>
  );
};

class Dictionary extends Component { // Dictionary Component Structure
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    };
  }

  componentDidMount() { // Break up the passed in data
    this.props.getAllBooks();
  }

  handleEdit = () => { // Enables and disables edit mode
    this.setState((prevState) => ({ edit: !prevState.edit }));
  }

  addPage = (object) => {
    const JSON_parsed = JSON.parse(this.props.currentBook.content);
    const array_pages = JSON_parsed.JSON_array;
    array_pages.push(object);
    const new_pages = JSON.stringify(array_pages);
    const new_obj = { // Parses content string into Json, gets the json array, access the data, adds object
      title: this.props.currentBook.title,
      username: this.props.currentBook.username,
      tags: this.props.currentBook.tags,
      coverUrl: this.props.currentBook.coverUrl,
      content: `{"JSON_array":${new_pages}}`,
    };
    this.props.putBook(this.props.currentBook.id, new_obj, this.props.history);
  }

  render() {
    return ( // Returns a router with a list of all possible books you could open
      <div className="dict-display">
        <div className="tools">
          <DeleteButton data={this.props.currentBook} />
          <PageMaker adder={this.addPage} />
        </div>
        <div className="page-display">
          <Router>
            <div className="nav-display">
              <Nav pageList={this.props.currentBook.content}
                current_path={this.props.history.location.pathname}
                setter={this.props.setPage}
              />
            </div>
            <div className="content">
              <Switch>
                <Route exact path={`${this.props.history.location.pathname}`} component={Cover} />
                <Route exact path={`${this.props.history.location.pathname}/page/:id`} component={Page} />
                <Route component={FallBack} />
              </Switch>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({ // Connects booksList to our Redux Prop books.list
  currentBook: reduxState.books.selected,
  page_data: reduxState.books.page_data,
});

export default connect(mapStateToProps, {
  getAllBooks, getBook, putBook, setPage,
})(Dictionary); // Connects Props and Reducer Actions to Component
