import React from 'react';
import { Glyphicon, Input, Nav, Navbar, NavItem } from 'react-bootstrap'
import Rebase from 're-base';

class Header extends React.Component{
  render () {
    return (
      <div>
        <Navbar inverse staticTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href='#'>Rushchad</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav onSelect={handleSelect.bind(this)}>
              <NavItem href='#' eventKey={1}><Glyphicon glyph='home' /></NavItem>
              <NavItem href='#' eventKey={2}><Glyphicon glyph='th-list' /></NavItem>
            </Nav>
            <Nav onSelect={handleModal.bind(this)}>
              <NavItem href='#' eventKey={3}><Glyphicon glyph='plus' /></NavItem>
            </Nav>
            <Nav>
              <Navbar.Form>
                <Input type='text' placeholder='Search'/>
              </Navbar.Form>
            </Nav>
            <Nav onSelect={handleModal.bind(this)} pullRight>
              <NavItem href='#' eventKey={5}><Glyphicon glyph='log-out' /></NavItem>
            </Nav>
            <Nav onSelect={handleSelect.bind(this)} pullRight>
              <NavItem href='#' eventKey={4}>{ this.props.googleUser["displayName"] }</NavItem>
            </Nav>

          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
};

function handleSelect(selectedKey) {
  var router = this.context.router;
  if (selectedKey == 1) {
    router.transitionTo('/', {});
  } else if (selectedKey == 2) {
    router.transitionTo('list',{});
  } else if (selectedKey == 4) {
    router.transitionTo('profile', {username: "ziruixiao"});
  }
}

function handleModal(selectedKey) {
  var router = this.context.router;
  if (selectedKey == 3) {
    alert('Modal to add new will be here');
    // router.transitionTo('profile', {username: "ziruixiao"});
  } else if (selectedKey == 5) {
    logOut();
  }
}

function logOut() {
  var ref = new Firebase('https://rushchad.firebaseio.com/');
  console.log(ref.getAuth());
  ref.unauth();
  document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://rushchad.com"
}

Header.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Header;