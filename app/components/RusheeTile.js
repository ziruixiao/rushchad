/**
 * Created by Felix on 1/4/16.
 */
import React from 'react';
import {
  Col,
  Image,
  Panel
} from 'react-bootstrap';

class RusheeTile extends React.Component{
  render(){
    return (
      <div>
        <Col xs={12} sm={4} md={4}>
          <Panel header="Rushee Name" footer="More Info Here" bsStyle="info">
            <Image src="http://jagc.org/images/avatar.png" responsive/>
          </Panel>
        </Col>
      </div>
    )
  }
};

export default RusheeTile;