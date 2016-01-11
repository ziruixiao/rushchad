/**
 * Created by Felix on 1/4/16.
 */
import React from 'react';
import {
  Badge,
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
    router.transitionTo('detail', {rusheeId: this.props.rusheeId});
  }
  render(){

    var numComments = (this.props.rushee["comments"]) ? Object.keys(this.props.rushee["comments"]).length : 0;
    var numRatings = (this.props.rushee["ratings"]) ? Object.keys(this.props.rushee["ratings"]).length : 0;
    var thumbPhotoUrl = "http://jagc.org/images/avatar.png";
    if (this.props.rushee["photos"]) {
      if (this.props.rushee["photos"][0]) {
        thumbPhotoUrl = this.props.rushee["photos"][0];
      }
    }
    var myDoc = document.getElementById('photo' + this.props.rusheeId);
    if (myDoc) {
      myDoc.error(function() {
        console.log('error');
      });
    }
    var stars = 0.1;
    if (this.props.rushee["ratings"]) {
      var count = 0;
      var sum = 0;
      Object.keys(this.props.rushee["ratings"]).map((key) => {
        sum += Number(this.props.rushee["ratings"][key]["value"]);
        count++;
      });
      stars = Math.round(sum/count);
    }

    return (
      <div>

          <Col xs={12} sm={6} md={4} lg={3}>
            <Panel className='fixed-panel' header={
              <div>{this.props.rushee["firstName"]}{' '}{this.props.rushee["lastName"]}</div>

            } footer={
              <div>
              <Row>
                <Col xs={5} sm={5} md={5}>
                  <Glyphicon glyph='comment' />
                  {' '}
                  <Badge>{numComments}</Badge>
                </Col>
                <Col xs={7} sm={7} md={7}>
                  <StarRating name="rusheeRating" size={15} disabled rating={stars} totalStars={5} />
                  <Badge>{numRatings}</Badge>
                </Col>
              </Row>

              </div>
            } bsStyle="info" onClick={this.showDetailView.bind(this)}>
              <div className="panel-photo">
              <Image id={'photo' + this.props.rusheeId} src={thumbPhotoUrl} responsive className="img-responsive center-block"/>
              </div>
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