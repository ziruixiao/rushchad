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
  showDetailView() {
    var router = this.context.router;
    router.transitionTo('detail', {rushee: "ziruixiao"});
  }
  render(){
    return (
      <div>
        <Col xs={12} sm={4} md={4}>
          <Panel header="Rushee Name" footer="More Info Here" bsStyle="info" onClick={this.showDetailView.bind(this)}>
            <Image  src="http://jagc.org/images/avatar.png" responsive/>
          </Panel>
        </Col>

      </div>
    )
  }
};

RusheeTile.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default RusheeTile;