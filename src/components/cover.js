/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DeletePage from './deletePage';
import { putBook, getBook, getAllBooks } from '../actions';
import '../style.scss'; // Lots O' Imports

class Cover extends Component { // Cover Component Structure
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      title: '', // initalized at nothing to see if there was a change
      coverUrl: '',
      tags: '',
    };
  }

  handleEdit = () => { // Enables and disables edit mode
    this.setState((prevState) => ({ edit: !prevState.edit }));
  }

  handlePic = (event) => { // handles picture change
    this.setState({ coverUrl: event.target.value });
  }

  handleTitle = (event) => { // handles title change
    this.setState({ title: event.target.value });
  }

  handleTags = (event) => { // handles tag changes
    this.setState({ tags: event.target.value });
  }

  onInput = () => {
    let passed_title = this.props.currentBook.title; // creates variables for new object
    let passed_cover = this.props.currentBook.coverUrl;
    let passed_tags = this.props.currentBook.tags;
    const passed_username = this.props.currentBook.username;

    if (this.state.title !== '') { // checks if there was a change for a section and then update if needed
      passed_title = this.state.title;
    }

    if (this.state.coverUrl !== '') {
      passed_cover = this.state.coverUrl;
    }

    if (this.state.tags !== '') {
      passed_tags = this.state.tags;
    }

    const new_obj = { // makes new object
      title: passed_title,
      tags: passed_tags,
      coverUrl: passed_cover,
      content: this.props.currentBook.content,
      username: passed_username,
    };
    this.props.putBook(this.props.currentBook.id, new_obj, this.props.history);
  }

  render() {
    return ( // What the page will hopefully look like
      !this.state.edit
        ? (
          <div className="page">
            <div className="cover-photo">
              <img src={this.props.currentBook.coverUrl} alt="cover_pic" className="picture" />
            </div>
            <div className="auth">
              Written by: {this.props.currentBook.username}
            </div>
            <div className="logo">
              {this.props.currentBook.title}
            </div>
            <div className="footer">
              {this.props.currentBook.tags}
            </div>
            <div className="edit">
              <i className="fas fa-edit" aria-hidden="true" onClick={this.handleEdit} />
            </div>
          </div>
        )
        : (
          <div className="page">
            <DeletePage passedInID={this.state.index} />
            <div className="cover-photo-edit">
              <input
                type="text"
                style={{ fontsize: '30px', outline: 'none' }}
                defaultValue={this.props.currentBook.coverUrl}
                onChange={this.handlePic}
              />
            </div>
            <div className="logo-edit">
              <input
                maxLength="15"
                type="text"
                style={{ fontsize: '30px', outline: 'none' }}
                defaultValue={this.props.currentBook.title}
                onChange={this.handleTitle}
              />
            </div>
            <div className="footer-edit">
              <input
                type="text"
                maxLength="15"
                style={{ fontsize: '30px', outline: 'none' }}
                defaultValue={this.props.currentBook.tags}
                onChange={this.handleTags}
              />
            </div>
            <div className="edit">
              <i className="fas fa-save"
                aria-hidden="true"
                onClick={() => {
                  this.handleEdit();
                  this.onInput();
                }}
              />
            </div>
          </div>
        )
    );
  }
}

const mapStateToProps = (reduxState) => ({ // Connects booksList to our Redux Prop books.list
  page_data: reduxState.books.page_data,
  currentBook: reduxState.books.selected,
  selected_content: reduxState.books.selected.content,
  username: reduxState.auth.username,
});

export default connect(mapStateToProps, { putBook, getBook, getAllBooks })(Cover); // Connects Props and Reducer Actions to Component
