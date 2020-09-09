import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteBook, getAllBooks } from '../actions'; // Imports action creators

const DeleteButton = (props) => {
  return (
    <div className="deleteButton">
      <button type="button"
        onClick={() => {
          props.deleteBook(props.data.id, props.history);
          props.getAllBooks(); // Calls redux functions upon deleting book
        }}
      >Delete Book
      </button>
    </div>
  );
};

export default withRouter(connect(null, { deleteBook, getAllBooks })(DeleteButton));
