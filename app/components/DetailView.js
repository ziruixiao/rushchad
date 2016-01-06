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
  render(){
    var rusheeId = this.router.getCurrentParams().rusheeId;
    var rushee = this.props.rushees[rusheeId];
    var rusheeName, rusheeFacebook, rusheePhone, rusheeEmail, rusheePhotos;
    var numRatings = 0;
    var stars = 0.1;
    var rusheeComments;

    if (rushee) {
      var lastUpdated = <Badge><TimeAgo date={new Date(Number(rushee["lastUpdated"])*1000)}/></Badge>
      var facebook = rushee["facebook"];
      var name = rushee["firstName"] + ' ' + rushee["lastName"];
      var email = rushee["email"];
      var phone = rushee["phone"];
      if (facebook) {
        rusheeName = <h1><a href={facebook} target="_blank">{name}{' '}</a><Button>Edit</Button></h1>
        rusheeFacebook = <div><Glyphicon bsSize="small" glyph="facebook" />{' '}<a href={facebook} target="_blank">Facebook</a></div>;
      } else {
        rusheeName = <h1>{name}{' '}<Button>Edit</Button></h1>
      }
      rusheeEmail = <div><Glyphicon bsSize="small" glyph="email" />{' '}{rushee["email"]}</div>;
      rusheePhone = <div><Glyphicon bsSize="small" glyph="phone" />{' '}{rushee["phone"]}</div>;

      numRatings = (rushee["ratings"]) ? Object.keys(rushee["ratings"]).length : 0;

      if (rushee["ratings"]) {
        var count = 0;
        var sum = 0;
        Object.keys(rushee["ratings"]).map((key) => {
          sum += Number(rushee["ratings"][key]["value"]);
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


    console.log(rushee);
    return (
      <div>
        <Col xs={12}>
          {rusheeName}
        </Col>
        <Table striped bordered condensed hover>
          <tbody>
          <tr>
            <td className="vert-align">
              <StarRating name="rusheeRating" size={25} disabled rating={stars} totalStars={5} />
              <Badge>{numRatings + ' votes'}</Badge>
            </td>
            <td className="vert-align">
              {rusheePhone}
              {rusheeFacebook}
              {rusheeEmail}
            </td>
            <td className="vert-align">
              Updated<br />
              {lastUpdated}
            </td>
          </tr>
          </tbody>
        </Table>
        <CommentList users={this.props.users} comments={rusheeComments} rusheeId={rusheeId}/>


      </div>
    )
  }
};

DetailView.contextTypes = {
  router: React.PropTypes.func.isRequired
};


export default DetailView;