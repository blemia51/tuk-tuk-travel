import React, { Component } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

class Chat extends Component {
  componentDidMount() {
    addResponseMessage("Salut! si tu as des questions c'est ici!");
  }

  handleNewUserMessage = (newMessage) => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
    addResponseMessage("hello");
  }

  render() {
    const { location } = this.props;
    const { state: { avatar } } = location;
    return (
      <div className="App">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          profileAvatar={avatar}
        />
      </div>
    );
  } 
}

export default Chat;
