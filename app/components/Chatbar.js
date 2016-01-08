/**
 * Created by Felix on 1/7/16.
 */
import React from 'react';
import Rebase from 're-base';
import {Col, ButtonToolbar, Navbar, Row, Popover, Nav, Button, OverlayTrigger, NavItem, NavDropdown, MenuItem, Well, Panel} from 'react-bootstrap';
import * as firebaseActions from './firebaseActions';
import TimeAgo from 'react-timeago';

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
        var messageOwner = this.props.users[oneMessage["userId"]]["name"];
        var messageContent = oneMessage["content"];
        var messageTime = new Date(Number(oneMessage["lastUpdated"])*1000);
        return (
          <div key={key} className="top-bottom-space chat-scroll">
            <Row>
            <Col className="align-left" xs={6}>
              <strong>{messageOwner}</strong>
            </Col>
            <Col className="align-right" xs={6}>
              <TimeAgo date={messageTime}/>
            </Col>
              </Row>
            <Row>
              <Col xs={12}>
              {messageContent}
                </Col>
            </Row>
          </div>
        )
      });
    }
    return (
      <ButtonToolbar className="fixedBottomRight">

        <OverlayTrigger trigger="click" placement="top" overlay={<Popover className="chat-bar-button" title="9 users online">
{chatMessages}
</Popover>}>
          <Button className="chat-bar-button" bsStyle="primary">Live Chat</Button>
        </OverlayTrigger>

      </ButtonToolbar>
    )
  }
};

Chatbar.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Chatbar;