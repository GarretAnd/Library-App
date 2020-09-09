/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { putBook, getBook } from '../actions'; // Imports action creators

const deletePage = (props) => {
  return (
    <div className="delete-page">
      <button type="button"
        onClick={() => { // Parses JSON, removes specified element from array via splice
          const JSON_parsed = JSON.parse(props.selected_content);
          const array_pages = JSON_parsed.JSON_array;
          array_pages.splice(props.page_data[1], 1); // Removes 1 array element from provided index (index, #)
          const new_pages = JSON.stringify(array_pages);
          const new_obj = { // updates object with new array
            title: props.currentBook.title,
            tags: props.currentBook.tags,
            coverUrl: props.currentBook.coverUrl,
            content: `{"JSON_array":${new_pages}}`,
          };
          props.putBook(props.currentBook.id, new_obj, props.history);
        }}
      >
        Delete Page
      </button>
    </div>
  );
};

const mapStateToProps = (reduxState) => ({ // Connects booksList to our Redux Prop books.list
  currentBook: reduxState.books.selected,
  page_data: reduxState.books.page_data,
  selected_content: reduxState.books.selected.content,
});

export default withRouter(connect(mapStateToProps, { putBook, getBook })(deletePage));
