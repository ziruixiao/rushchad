/**
 * Created by Felix on 1/7/16.
 */
import React from 'react';
import Rebase from 're-base';
import {Col, Navbar, Row, Nav, NavItem, NavDropdown, MenuItem, Panel} from 'react-bootstrap';
import * as firebaseActions from './firebaseActions';

class Chatbar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      messages: []
    };
  }
  init(){
    var chatRef = new Firebase('https://rushchad.firebaseio.com/chat');
    chatRef.on('value', function(dataSnapshot) {
      this.setState({
        messages: dataSnapshot.val()
      });
    }.bind(this));
  }
  handleNewMessage() {
    var s_content = this.refs.newMessage.getValue();

    var dictionary = {
      content: s_content,
      lastUpdated: Math.round(Number(Date.now())/1000),
      userId: this.props.loggedInUserId
    };
    firebaseActions.addNewChatMessage(dictionary);
  }
  componentWillMount(){
    this.router = this.context.router;
  }
  componentDidMount(){
    this.init();
  }
  componentWillUnmount(){
  }
  componentWillReceiveProps(){
    this.init();
  }
  render(){
    var chatMessages;
    if (Object.keys(this.state.messages).length > 0) {
      chatMessages = Object.keys(this.state.messages).map((key) => {
        var oneMessage = this.state.messages[key];
        var messageOwner = this.props.users[oneMessage["userId"]];
        var messageContent = oneMessage["content"];
        return (
          <div key={key}>
            Hello
          </div>
        )
      });
    }
    return (
      <div>
        <Navbar fixedBottom>
            <Nav pullRight>
              <NavDropdown title="Click for Live Chat" id="basic-nav-dropdown">
                <MenuItem><div>

                    {chatMessages}

                </div></MenuItem>
              </NavDropdown>
            </Nav>
        </Navbar>
      </div>
    )
  }
};

Chatbar.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Chatbar;