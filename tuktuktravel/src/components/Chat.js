import React, { Component } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import herve from '../assets/img/herve.png'

import 'react-chat-widget/lib/styles.css';

class Chat extends Component {
  componentDidMount() {
    addResponseMessage("Welcome to this awesome chat!");
  }

  handleNewUserMessage = (newMessage) => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
    addResponseMessage("hello");
  }

  render() {
    return (
      <div className="App">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          profileAvatar={herve}
        />
      </div>
    );
  } 
}

export default Chat;