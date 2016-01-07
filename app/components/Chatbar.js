/**
 * Created by Felix on 1/7/16.
 */
import React from 'react';
import Rebase from 're-base';
import {Col, Button, ButtonGroup} from 'react-bootstrap';

class Chatbar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }
  init(){

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
    return (
      <div>
        <Col xsOffset={9} xs={3}>
        <Button className="fixedBottomRight" bsStyle="primary">
        Chat
        </Button>
          </Col>
      </div>
    )
  }
};

Chatbar.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Chatbar;