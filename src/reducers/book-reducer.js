import { ActionTypes } from '../actions';

const initialState = { // initial state of books that can be accessed via props.books.__insert-thingy__
  selected: { title: 'place_holder', content: '{"JSON_array": [{"content": "stuff"}]}' },
  list: [],
  page_data: [],
};

const BookReducer = (state = initialState, action) => { // Currently just set for get all
  switch (action.type) {
    case ActionTypes.GET_BOOK:
      return { selected: action.payload, list: state.list, page_data: state.page_data };
    case ActionTypes.GET_ALL: // Triggered with GET_ALL and returns the associated values
      return { selected: state.selected, list: action.payload, page_data: state.page_data };
    case ActionTypes.SET_PAGE:
      return { selected: state.selected, list: state.list, page_data: action.payload };
    case ActionTypes.DELETE_BOOK:
      return { ...state }; // Takes the content of state and puts in this
    case ActionTypes.NEW_BOOK:
      return { ...state };
    case ActionTypes.UPDATE_BOOK:
      return { ...state };
    default:
      return state;
  }
};

export default BookReducer;
