/* eslint-disable max-len */
import React, { Component } from 'react';

class PageMaker extends Component {
  constructor(props) {
    super(props);

    this.state = { // Knows Title Of Note
      title: '',
    };
  }

  onInput = (event) => {
    if (event.key === 'Enter') { // Only When They Hit Enter
      const page = {
        title: `${this.state.title}`, // Makes object with that title
        coverUrl: 'https://picsum.photos/200/300',
        tags: 'page',
        content: 'Add Content to your page here!',
      };
      this.props.adder(page); // Makes New Book
    }
  }

  updateTitle = (event) => { // Updates State Based On Input
    this.setState({ title: event.target.value });
  }

  render() {
    return ( // A Search Bar... With Attitude
      <div>
        <input
          id="page-bar"
          type="text"
          maxLength="15"
          className="maker"
          autoComplete="off"
          onKeyDown={this.onInput}
          onChange={this.updateTitle}
          value={this.state.title}
          placeholder="Hit Enter To Make A Page!"
        />
      </div>
    );
  }
}

export default PageMaker;
