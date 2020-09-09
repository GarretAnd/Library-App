/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DeletePage from './deletePage';
import { putBook, getBook, getAllBooks } from '../actions';
import '../style.scss'; // Lots O' Imports

class Page extends Component { // Page Component Structure
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      index: 0, // Sets data to curret selected page data
      title: this.props.page_data[0].title,
      content: this.props.page_data[0].content,
      coverUrl: this.props.page_data[0].coverUrl,
      tags: this.props.page_data[0].tags,
    };
  }

  componentDidMount() { // Sets the index in the page to show us
    this.setState({ index: this.props.match.params.id });
  }

  handleEdit = () => { // Enables and disables edit mode
    this.setState((prevState) => ({ edit: !prevState.edit }));
  }

  handlePic = (event) => { // Handles picture change
    this.setState({ coverUrl: event.target.value });
  }

  handleTitle = (event) => { // handle title change
    this.setState({ title: event.target.value });
  }

  handleContent = (event) => { // handle content change
    this.setState({ content: event.target.value });
  }

  handleTags = (event) => { // handle tag change
    this.setState({ tags: event.target.value });
  }

  onInput = () => { // Parses JSON and makes new page based off entered data
    const JSON_parsed = JSON.parse(this.props.selected_content);
    const array_pages = JSON_parsed.JSON_array;
    const new_page = {
      title: this.state.title,
      tags: this.state.tags,
      coverUrl: this.state.coverUrl,
      content: this.state.content,
    };
    array_pages[this.props.page_data[1]] = new_page; // Removes 1 array element from provided index (index, #)
    const new_pages = JSON.stringify(array_pages); // updates page at the specified index
    const new_obj = {
      title: this.props.currentBook.title, // makes new object
      tags: this.props.currentBook.tags,
      coverUrl: this.props.currentBook.coverUrl,
      content: `{"JSON_array":${new_pages}}`,
    };
    this.handleEdit(); // toggles edit
    this.props.putBook(this.props.currentBook.id, new_obj, this.props.history);
  }

  render() {
    return ( // What the page will hopefully look like
      !this.state.edit
        ? (
          <div className="page">
            <div className="cover-photo">
              <img src={this.props.page_data[0].coverUrl} alt="cover_pic" className="picture" />
            </div>
            <div className="logo">
              {this.props.page_data[0].title}
            </div>
            <div className="story">
              {this.props.page_data[0].content}
            </div>
            <div className="footer">
              {this.props.page_data[0].tags}
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
                defaultValue={this.props.page_data[0].coverUrl}
                onChange={this.handlePic}
              />
            </div>
            <div className="logo-edit">
              <input
                maxLength="15"
                type="text"
                style={{ fontsize: '30px', outline: 'none' }}
                defaultValue={this.props.page_data[0].title}
                onChange={this.handleTitle}
              />
            </div>
            <div className="story-edit">
              <textarea
                type="text"
                className="edit-area"
                defaultValue={this.props.page_data[0].content}
                onChange={this.handleContent}
              />
            </div>
            <div className="footer-edit">
              <input
                type="text"
                maxLength="15"
                style={{ fontsize: '30px', outline: 'none' }}
                defaultValue={this.props.page_data[0].tags}
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
});

export default connect(mapStateToProps, { putBook, getBook, getAllBooks })(Page); // Connects Props and Reducer Actions to Component
