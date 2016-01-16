/**
 * Created by Felix on 1/4/16.
 */
import React from 'react';
import {
  Badge,
  Button,
  Carousel,
ButtonToolbar,
  CarouselItem,
  Col,
Image,
  Glyphicon,
  OverlayTrigger,
Tooltip,
  Row,
  Table,
  Well
} from 'react-bootstrap';
import TimeAgo from 'react-timeago';
import StarRating from 'react-star-rating';
import CommentList from './CommentList';
import * as firebaseActions from './firebaseActions';

class DetailView extends React.Component{
  makeDecision(choice) {
    var dictionary = {
      "cutParameter": choice
    };
    firebaseActions.addOrUpdateRushee(this.router.getCurrentParams().rusheeId, dictionary, this.props.loggedInUserId);
  }
  componentWillMount(){
    this.router = this.context.router;
  }
  connectToRusheesRef() {
    if (!this.props.rushees || !this.props.rushees.length) {
      this.props.updateStateRushees();
    }

  }
  init() {
    this.connectToRusheesRef();
  }
  componentWillReceiveProps(){
    this.init();
  }
  showPrev(prevId) {
    var router = this.context.router;
    router.transitionTo('detail', {rusheeId: prevId});
  }
  showNext(nextId) {
    var router = this.context.router;
    router.transitionTo('detail', {rusheeId: nextId});
  }
  editButton(editActiveRusheeId) {
    this.props.openEditModal(editActiveRusheeId);
  }
  handleVote(e,vals) {
    var dictionary = {
      "value": vals["rating"],
      "lastUpdated":  Math.round(Number(Date.now())/1000)
    };
    firebaseActions.addOrUpdateRating(this.router.getCurrentParams().rusheeId, this.props.loggedInUserId, dictionary);
  }
  render(){
    var rusheeId = this.router.getCurrentParams().rusheeId;
    console.log('rushee id is',rusheeId);
    var arrayRusheeId = 0;
    var rushee;
    var prevButton;
    var nextButton;
    for(var i = 0; i < this.props.rushees.length; i += 1) {
      if(this.props.rushees[i][0] == rusheeId) {
        if (i-1 >= 0) {
          prevButton = <Button bsStyle="primary"
                               onClick={this.showPrev.bind(this,this.props.rushees[i-1][0])}><Glyphicon glyph="chevron-left" /></Button>;
        }
        if (i+1 < this.props.rushees.length - 1) {
          nextButton = <Button bsStyle="primary" onClick={this.showPrev.bind(this,this.props.rushees[i+1][0])}><Glyphicon glyph="chevron-right" /></Button>;
        }
        rushee = this.props.rushees[i][1];
        break;
      }
    }
    var cutDecision;

    var rusheeName, rusheeFacebook, rusheePhone, rusheeEmail, rusheePhotos;
    var numRatings = 0;
    var stars = 0.1;
    var rusheeComments;
    var rushingWith;
    var userStars = 0;
    var userRating = 'none';
    var carousel;
    var tooltip =  <Tooltip id="allVoteToolTip">No votes.</Tooltip>;
    if (rushee) {
      var lastUpdated = <TimeAgo date={new Date(Number(rushee["lastUpdated"])*1000)}/>
      var facebook = rushee["facebook"];
      var name = rushee["firstName"] + ' ' + rushee["lastName"];
      var email = rushee["email"];
      var phone = rushee["phone"];
      if (facebook && facebook!="http://") {
        facebook = addHttp(facebook);
        rusheeName = <h1><a href={facebook} target="_blank">{name}{' '}</a><Button onClick={this.editButton.bind(this,rusheeId)}>Edit</Button></h1>
        rusheeFacebook = <div><Glyphicon bsSize="small" glyph="facebook" />{' '}<a href={facebook} target="_blank">Facebook</a></div>;
      } else {
        rusheeName = <h1>{name}{' '}<Button onClick={this.editButton.bind(this,rusheeId)}>Edit</Button></h1>
      }
      rusheeEmail = <div><Glyphicon bsSize="small" glyph="email" />{' '}{rushee["email"]}</div>;
      rusheePhone = <div><Glyphicon bsSize="small" glyph="phone" />{' '}{rushee["phone"]}</div>;

      numRatings = (rushee["ratings"]) ? Object.keys(rushee["ratings"]).length : 0;

      if (rushee["rushingWith"]) {
        rushingWith = rushee["rushingWith"];
      }
      if (rushee["ratings"]) {
        var count = 0;
        var sum = 0;
        var toolTipContent = Object.keys(rushee["ratings"]).map((key) => {
          sum += Number(rushee["ratings"][key]["value"]);
          if (key == this.props.loggedInUserId) { //this is our user's vote
            userStars = Number(rushee["ratings"][key]["value"]);
            userRating = userStars + ' ' + ' stars';
          }

          count++;
          return (<tr key={key}><td>{this.props.users[key]["name"]}</td><td>{rushee["ratings"][key]["value"]} {' stars'}</td></tr>);
        });
        tooltip = <Tooltip id="allVoteToolTip"><table><tbody>{toolTipContent}</tbody></table></Tooltip>;
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

      if (this.props.loggedInUserId == 1) {
        cutDecision = (<ButtonToolbar>
          <Button onClick={this.makeDecision.bind(this, 'round3yes')}>Yes</Button>
          <Button onClick={this.makeDecision.bind(this, 'round3maybe')}>Maybe</Button>
          <Button onClick={this.makeDecision.bind(this, 'round3no')}>No</Button>

        </ButtonToolbar>);
      }
      if (rushee["comments"]) {
        rusheeComments = rushee["comments"];
      }

      if(rushee["photos"]) {
        var carouselItems = Object.keys(rushee["photos"]).map((key) => {
          return(
          <CarouselItem  key={key} className="picture-carousel">
            <image className="carousel-photo" src={rushee["photos"][key]} />
          </CarouselItem>)

        });

        carousel = <Carousel className="carousel-container">{ carouselItems} </Carousel>;
      }
    }

    return (
      <div>
        <Col className="align-right" xs={6}>
          {prevButton}
        </Col>
        <Col xs={6}>
          {nextButton}
        </Col>
        <Col xs={12}>
          {rusheeName}
        </Col>
        <Col xs={12}>
          {cutDecision}
        </Col>

        <Col xs={6}>
          Updated{' '}{lastUpdated}
        </Col>
        <Col xs={6}>
          <strong>Rushing with:</strong>{' '}{rushingWith}
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
            <OverlayTrigger placement="bottom" overlay={tooltip}>
            <td className="vert-align">
              Fraternity Vote<br />
              <StarRating name="rusheeRating" size={25} disabled rating={stars} totalStars={5} />
              <br />
              <Badge>{numRatings + ' votes'}</Badge>
            </td>
              </OverlayTrigger>
            <td className="vert-align">
              <Col xs={12}>
              Your Vote<br />
              <StarRating name="userRusheeRating" size={25} onRatingClick={this.handleVote.bind(this)} rating={userStars} totalStars={5} />
              <br /><Badge>{userRating}</Badge>
                </Col>
            </td>
          </tr>
          </tbody>
        </Table>
          {carousel}

        <CommentList users={this.props.users} loggedInUserId={this.props.loggedInUserId} rusheeId={rusheeId}/>


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