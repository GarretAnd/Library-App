/* eslint-disable max-len */
import React, { Component } from 'react';

class BookMaker extends Component {
  constructor(props) {
    super(props);

    this.state = { // Knows Title Of Note
      title: '',
      good2go: true,
    };
  }

  resetState = () => {
    this.setState({ good2go: true });
  }

  onInput = (event) => {
    if (event.key === 'Enter') { // Only When They Hit Enter
      const book = {
        title: `${this.state.title}`,
        coverUrl: 'https://picsum.photos/200/300',
        username: this.props.usern,
        tags: 'book',
        content: '{"JSON_array":[{"title":"Page 1","tags":"page","content":"Add Content to your page here!","coverUrl":"https://picsum.photos/200/300"},{"title":"Page 2","tags":"page","content":"Add Content to your page here!","coverUrl":"https://picsum.photos/200/300"},{"title":"Page 3","tags":"page","content":"Add Content to your page here!","coverUrl":"https://picsum.photos/200/300"},{"title":"Page 4","tags":"page","content":"Add Content to your page here!","coverUrl":"https://picsum.photos/200/300"}]}',
      }; // Makes template book with json array inside of it
      if (this.props.authorize === true) {
        this.props.makeBook(book); // Makes New Book
      } else {
        console.log('You are not authorized to make books!');
        this.setState({ good2go: false });
      }
    }
  }

  updateTitle = (event) => { // Updates State Based On Input
    this.setState({ title: event.target.value });
  }

  render() {
    return ( // A Search Bar... With Attitude
      this.state.good2go ? (
        <div>
          <input
            id="note-bar"
            type="text"
            maxLength="15"
            className="maker"
            autoComplete="off"
            onKeyDown={this.onInput}
            onChange={this.updateTitle}
            value={this.state.title}
            placeholder="Hit Enter To Make A Book!"
          />
        </div>
      ) : (
        <div className="no-card">
          You do not have your library card! Sign in/up to get one!
          <div className="go-away">
            {
            setTimeout(this.resetState, 5000)
          }
          </div>
        </div>
      )
    );
  }
}

export default BookMaker;
