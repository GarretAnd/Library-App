import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signinUser, signupUser, setUsername } from '../actions'; // Imports action creators

class signIn extends Component {
  constructor(props) {
    super(props);

    this.state = { // Knows Title Of Note
      username: '',
      password: '',
      authour: '',
    };
  }

  onInput = (event) => {
    const newObj = { email: this.state.username, password: this.state.password, username: this.state.authour };
    this.props.signinUser(newObj, this.props.history); // signs in user
  }

  onSave = (event) => {
    const newObj = { email: this.state.username, password: this.state.password, username: this.state.authour };
    this.props.signupUser(newObj, this.props.history); // signs in user
  }

  updateUserName = (event) => { // Updates State Based On Input
    this.setState({ username: event.target.value });
  }

  updatePassword = (event) => { // Updates State Based On Input
    this.setState({ password: event.target.value });
  }

  updateAuthour = (event) => { // Updates State Based On Input
    this.setState({ authour: event.target.value });
  }

  render() {
    return (
      <div className="organizer">
        <div className="sign-box">
          <div className="enter-user">
            Please Enter Your Email
            <input
              id="email-bar"
              type="text"
              className="maker"
              autoComplete="off"
              onChange={this.updateUserName}
              value={this.state.username}
              placeholder="Enter Your Email"
            />
          </div>
          <div className="enter-passoword">
            Please Enter Your Password
            <input
              id="password-bar"
              type="text"
              className="maker"
              autoComplete="off"
              onChange={this.updatePassword}
              value={this.state.password}
              placeholder="Enter Your Password"
            />
          </div>
          <div className="enter-userName">
            Please Enter Your Username
            <input
              id="username-bar"
              type="text"
              className="maker"
              autoComplete="off"
              onChange={this.updateAuthour}
              value={this.state.authour}
              placeholder="Enter Your Username"
            />
          </div>
          <div className="sign-in">
            <button className="Sbutton" type="button" onClick={this.onInput}>
              Sign In
            </button>
          </div>
          <div className="sign-up">
            <button className="Sbutton" type="button" onClick={this.onSave}>
              Sign Up
            </button>
          </div>
        </div>
        <div className="authStuff">
          <div className="Instru1">
            Please Sign In!
          </div>
          <div className="Instru2">
            Or if you are new to the site, Sign Up!
          </div>
          <div className="Instru3">
            You do not want to be caught without your library card!
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, {
  signinUser, signupUser, setUsername,
})(signIn)); // Connects Props and Reducer Actions to Component
