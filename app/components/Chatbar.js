/**
 * Created by Felix on 1/7/16.
 */
import React from 'react';
import Rebase from 're-base';
import {Col, ButtonToolbar, Glyphicon, ButtonInput, Input, Navbar, Row, Popover, Nav, Button, OverlayTrigger, NavItem, NavDropdown, MenuItem, Well, Panel} from 'react-bootstrap';
import * as firebaseActions from './firebaseActions';
import TimeAgo from 'react-timeago';

class Chatbar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      timestamp: Number(Date.now()),
      usersOnline: 0
    };
  }
  delayAndScroll() {
    setTimeout(this.scrollToBottom, 500);

  }
  scrollToBottom() {
    var chatBox = document.getElementById('chatBox');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight + 2000;
    }
  }
  init(){
    var chatRef = new Firebase('https://rushchad.firebaseio.com/chat');
    chatRef.on('value', function(dataSnapshot) {
      this.setState({
        messages: dataSnapshot.val()
      }, function() {

        var chatBox = document.getElementById('chatBox');
        if (chatBox) {
          if (chatBox.scrollHeight - chatBox.scrollTop < 800) { // scroll to bottom
            chatBox.scrollTop = chatBox.scrollHeight + 2000;
          }
        }
      });

    }.bind(this));

    var nowDate = Number(Date.now()) / 1000;
    var last10Min = nowDate - 600;
    new Firebase("https://rushchad.firebaseio.com/users").orderByChild("lastActive")
      .startAt(last10Min)
      .endAt(nowDate)
      .on('value', function(snap) {
        if (snap.val()) {

          this.setState({
            usersOnline: Object.keys(snap.val()).length
          });

        }
      }.bind(this));

  }
  handleNewMessage(e) {
    e.preventDefault();
    var s_content = this.refs.newMessage.getValue();
    if (s_content.length > 0) {
      var dictionary = {
        content: s_content,
        lastUpdated: Math.round(Number(Date.now()) / 1000),
        userId: this.props.loggedInUserId
      };
      firebaseActions.addNewChatMessage(dictionary, function() {
        var chatBox = document.getElementById('chatBox');
        chatBox.scrollTop = chatBox.scrollHeight + 2000;
      });
      this.setState({
        timestamp: Number(Date.now())
      });



    }
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
    //console.log('render');
    var chatInput = (
        <div className="top-bottom-space">
        <form onSubmit={this.handleNewMessage.bind(this)}>
          <Col xs={10}>
          <Input key={this.state.timestamp} type="text" ref="newMessage" placeholder="Type new message"/>
            </Col>
          <Col xs={2}>
            <Button bsSize="small" type="submit" bsStyle="primary"><Glyphicon glyph="chevron-right"/></Button>
          </Col>
        </form>
          </div>
    );

    if (Object.keys(this.state.messages).length > 0) {
      chatMessages = Object.keys(this.state.messages).map((key) => {
        var oneMessage = this.state.messages[key];
        var messageOwner = this.props.users[oneMessage["userId"]]["name"];
        var messageContent = oneMessage["content"];
        var messageTime = new Date(Number(oneMessage["lastUpdated"])*1000);
        var extraColoring = '';
        if (oneMessage["userId"] == this.props.loggedInUserId) {
          extraColoring = 'bg-warning';
        }
        return (
          <div key={key} className={'top-bottom-space ' + extraColoring}>
            <Row>
            <Col className="align-left" xs={6}>
              <strong>{messageOwner}</strong>
            </Col>
            <Col className="align-right" xs={6}>
              <TimeAgo date={messageTime} live={false}/>
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
    <Navbar fixedBottom>
      <Nav>
        <NavItem><OverlayTrigger trigger="click" placement="top" overlay={<Popover id="chatPopOver"  className="chat-bar-button absolute-positioning" title={this.state.usersOnline + ' users online'}>
          <div id="chatBox" className="chat-scroll">
            {chatMessages}
           </div>
           {chatInput}
           </Popover>}>
          <Button bsSize="small" onClick={this.delayAndScroll.bind(this)} className="chat-bar-button" bsStyle="success">Live Chat</Button>
        </OverlayTrigger></NavItem>
        <Nav>
          <NavItem>{ this.props.rusheeCount ? this.props.rusheeCount + ' rushees' : ''}</NavItem>
        </Nav>
        <Nav>
          <NavItem>{ this.props.commentCount ? this.props.commentCount + ' comments' : ''}</NavItem>
        </Nav>
        <Nav>
          <NavItem>{ this.props.ratingCount ? this.props.ratingCount + ' votes' : ''}</NavItem>
        </Nav>

      </Nav>
    </Navbar>
    )
  }
};

Chatbar.contextTypes = {
  router: React.PropTypes.func.isRequired
};

Chatbar.propTypes = {
  timestamp: React.PropTypes.number
};

Chatbar.defaultProps = {
  timestamp: Number(Date.now())
};

export default Chatbar;