import React from 'react';
import { Glyphicon, Input, Nav, Navbar, NavItem } from 'react-bootstrap'

class Header extends React.Component{
  render () {
    return (
      <div>
        <Navbar staticTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href='#'>Rushchad</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem href='#'><Glyphicon glyph='home' /></NavItem>
              <NavItem href='#'><Glyphicon glyph='th-list' /></NavItem>
              <NavItem href='#'><Glyphicon glyph='plus' /></NavItem>
            </Nav>
            <Nav>
              <Navbar.Form>
                <Input type='text' placeholder='Search'/>
              </Navbar.Form>
            </Nav>
            <Nav pullRight>
              <NavItem href='#'><Glyphicon glyph='user' /></NavItem>
              <NavItem href='#'><Glyphicon glyph='log-out' /></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
};

export default Header;