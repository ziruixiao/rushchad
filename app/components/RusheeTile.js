/**
 * Created by Felix on 1/4/16.
 */
import React from 'react';
import {
  Col,
  Glyphicon,
  Image,
  Panel,
  Row
} from 'react-bootstrap';
import StarRating from 'react-star-rating';

class RusheeTile extends React.Component{
  showDetailView() {
    var router = this.context.router;
    router.transitionTo('detail', {rushee: "ziruixiao"});
  }
  render(){
    return (
      <div>

          <Col xs={12} sm={4} md={4}>
            <Panel header={
              <div>Rushee Name</div>

            } footer={
              <div>
              <Row>
                <Col xs={4} sm={4} md={4}>
                  <Glyphicon glyph='comment' />
                  {' '}
                  47
                </Col>
                <Col xs={8} sm={8} md={8}>
                  <StarRating name="rusheeRating" size={15} caption="5 votes" disabled rating={3} totalStars={5} />
                </Col>
              </Row>

              </div>
            } bsStyle="info" onClick={this.showDetailView.bind(this)}>
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