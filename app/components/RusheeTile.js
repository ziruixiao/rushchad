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
  Row,
Well
} from 'react-bootstrap';
import StarRating from 'react-star-rating';
import TimeAgo from 'react-timeago';

class RusheeTile extends React.Component{
  showDetailView() {
    var router = this.context.router;
    router.transitionTo('detail', {rusheeId: this.props.rusheeId});
  }
  render(){
    var lastUpdated = <TimeAgo date={new Date(Number(this.props.rushee["lastUpdated"])*1000)} />
    var numComments = (this.props.rushee["comments"]) ? Object.keys(this.props.rushee["comments"]).length : 0;
    var numRatings = (this.props.rushee["ratings"]) ? Object.keys(this.props.rushee["ratings"]).length : 0;
    var thumbPhotoUrl = "http://jagc.org/images/avatar.png";
    if (this.props.rushee["photos"]) {
      if (this.props.rushee["photos"][0]) {
        // TODO: Uncomment this line below:
        thumbPhotoUrl = this.props.rushee["photos"][0];
      }
    }
    var myDoc = document.getElementById('photo' + this.props.rusheeId);

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
            <Well onClick={this.showDetailView.bind(this)} bsSize="small">
            <Panel className='fixed-panel' header={
              <div>{this.props.rushee["firstName"]}{' '}{this.props.rushee["lastName"]}</div>

            } footer={
              <div>
              <Row>
                <Col xs={7} sm={7} md={7}>
                  <Glyphicon glyph='comment' />
                  {' '}
                 {numComments} { ' comments'}
                </Col>
                <Col xs={5} sm={5} md={5} className="align-right">
                  <StarRating name="rusheeRating" size={15} disabled rating={stars} totalStars={5} />

                </Col>
              </Row>
              <Row>
                <Col xs={7}>
                <Glyphicon glyph='time' />
                  {' '}
                  {lastUpdated}
                </Col>
                <Col xs={5} className="align-right">
                  <Badge>{numRatings} { ' votes'}</Badge>
                </Col>
              </Row>

              </div>
            } bsStyle="info">
              <div className="panel-photo">
              <Image id={'photo' + this.props.rusheeId}  src={thumbPhotoUrl} responsive className="img-responsive center-block"/>
              </div>
            </Panel>
              </Well>
          </Col>

      </div>
    )
  }
};

RusheeTile.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default RusheeTile;