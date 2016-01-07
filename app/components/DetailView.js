/**
 * Created by Felix on 1/4/16.
 */
import React from 'react';
import {
  Badge,
  Button,
  Carousel,
  CarouselItem,
  Col,
  Glyphicon,
  Row,
  Table,
  Well
} from 'react-bootstrap';
import TimeAgo from 'react-timeago';
import StarRating from 'react-star-rating';
import CommentList from './CommentList';

class DetailView extends React.Component{
  componentWillMount(){
    this.router = this.context.router;
  }
  editButton(editActiveRusheeId) {
    this.props.openEditModal(editActiveRusheeId);
  }
  render(){
    var rusheeId = this.router.getCurrentParams().rusheeId;
    var rushee = this.props.rushees[rusheeId];
    var rusheeName, rusheeFacebook, rusheePhone, rusheeEmail, rusheePhotos;
    var numRatings = 0;
    var stars = 0.1;
    var rusheeComments;
    var userStars = 0;
    var userRating = 'none';

    if (rushee) {
      var lastUpdated = <TimeAgo date={new Date(Number(rushee["lastUpdated"])*1000)}/>
      var facebook = rushee["facebook"];
      var name = rushee["firstName"] + ' ' + rushee["lastName"];
      var email = rushee["email"];
      var phone = rushee["phone"];
      if (facebook) {
        facebook = addHttp(facebook);
        rusheeName = <h1><a href={facebook} target="_blank">{name}{' '}</a><Button onClick={this.editButton.bind(this,rusheeId)}>Edit</Button></h1>
        rusheeFacebook = <div><Glyphicon bsSize="small" glyph="facebook" />{' '}<a href={facebook} target="_blank">Facebook</a></div>;
      } else {
        rusheeName = <h1>{name}{' '}<Button onClick={this.editButton.bind(this,rusheeId)}>Edit</Button></h1>
      }
      rusheeEmail = <div><Glyphicon bsSize="small" glyph="email" />{' '}{rushee["email"]}</div>;
      rusheePhone = <div><Glyphicon bsSize="small" glyph="phone" />{' '}{rushee["phone"]}</div>;

      numRatings = (rushee["ratings"]) ? Object.keys(rushee["ratings"]).length : 0;

      if (rushee["ratings"]) {
        var count = 0;
        var sum = 0;
        Object.keys(rushee["ratings"]).map((key) => {
          sum += Number(rushee["ratings"][key]["value"]);
          if (key == this.props.loggedInUserId) { //this is our user's vote
            userStars = Number(rushee["ratings"][key]["value"]);
            userRating = userStars + ' ' + ' stars';
          }
          count++;
        });
        stars = Math.round(sum/count);
      }

      if (rushee["photos"]) {
        rusheePhotos = rushee["photos"].map((photo, index) => {
          return (
          <CarouselItem>
            <img width={900} height={500} alt="900x500" src={photo}/>
          </CarouselItem>
          )
        });
      }

      if (rushee["comments"]) {
        rusheeComments = rushee["comments"];
      }
    }

    return (
      <div>
        <Col xs={12}>
          {rusheeName}
        </Col>
        <Col xs={12}>
          Updated{' '}{lastUpdated}
        </Col>
        <Col xs={12}>
          {rusheePhone}
        </Col>
        <Col xs={12}>
          {rusheeFacebook}
        </Col>
        <Col xs={12}>
          {rusheeEmail}
        </Col>
        <Table striped bordered condensed hover>
          <tbody>
          <tr>
            <td className="vert-align">
              Fraternity Vote
              <StarRating name="rusheeRating" size={25} disabled rating={stars} totalStars={5} />
              <Badge>{numRatings + ' votes'}</Badge>
            </td>
            <td className="vert-align">
              Your Vote
              <StarRating name="userRusheeRating" size={25} rating={userStars} totalStars={5} />
              <Badge>{userRating}</Badge>
            </td>
          </tr>
          </tbody>
        </Table>
        <CommentList users={this.props.users} loggedInUserId={this.props.loggedInUserId} comments={rusheeComments} rusheeId={rusheeId}/>


      </div>
    )
  }
};

DetailView.contextTypes = {
  router: React.PropTypes.func.isRequired
};
DetailView.propTypes = {
  openEditModal: React.PropTypes.func.isRequired,
  closeEditModal: React.PropTypes.func.isRequired
};
function addHttp(url) {
  if (!/^https?:\/\//i.test(url)) {
    url = 'http://' + url;
  }
  return url;
}

export default DetailView;