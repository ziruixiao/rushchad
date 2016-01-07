/**
 * Created by Felix on 1/7/16.
 */
import React from 'react';
import {
  Badge,
  Button,
  Col,
  Glyphicon,
  Row,
} from 'react-bootstrap';

import TimeAgo from 'react-timeago';

class Comment extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      liked: false,
      disliked: false
    };
  }
  handleLike() {
    this.setState({
      liked: true,
      disliked: false
    });
    // TODO: Firebase!
  }
  handleDislike() {
    this.setState({
      liked: false,
      disliked: true
    });
    // TODO: Firebase!
  }
  render(){
    var commentRow;
    var comment = this.props.commentData;
    if (comment) {
      var likeButton = <Button onClick={this.handleLike.bind(this)}
                               bsSize="small"><Glyphicon
        glyph="thumbs-up"/></Button>;
      var dislikeButton = <Button onClick={this.handleDislike.bind(this)}
                                  bsSize="small"><Glyphicon
        glyph="thumbs-down"/></Button>;
      var numLikes = 0;
      var numDislikes = 0;

      if (comment["likes"]) {
        Object.keys(comment["likes"]).map((likeUserId, likeValue) => {
          var numLikeValue = Number(likeValue);
          if (likeValue == 1) {
            if (likeUserId == this.props.loggedInUserId) { // current user liked comment
              likeButton =
                <Button bsSize="small" bsStyle="success" active><Glyphicon
                  glyph="thumbs-up"/></Button>;
            }
            numLikes++;
          } else if (likeValue == 0) {
            if (likeUserId == this.props.loggedInUserId) { // current user liked comment
              dislikeButton =
                <Button bsSize="small" bsStyle="danger" active><Glyphicon
                  glyph="thumbs-down"/></Button>;
            }
            numDislikes++;
          }
        });
      }
    }

        return (
          <div className="top-bottom-space">
            <Row>
              <Col xs={8} sm={9}>
                <b>{this.props.commentUser}</b>
              </Col>
              <Col className="align-center"  xs={4} sm={3}>

                <TimeAgo date={new Date(Number(comment["lastUpdated"])*1000)}/>
              </Col>
            </Row>
            <Row>
              <Col xs={9}>
                {comment["content"]}
              </Col>
              <Col xs={3}>
                <Row>
                  <Col className="align-center" xs={6}>
                    {likeButton}
                  </Col>
                  <Col className="align-center" xs={6}>
                    {dislikeButton}
                  </Col>
                </Row>
                <Row>
                  <Col className="align-center" xs={6}>
                    <Badge>{numLikes}</Badge>
                  </Col>
                  <Col className="align-center" xs={6}>
                    <Badge>{numDislikes}</Badge>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

        )
  }
};

Comment.propTypes = {
  liked: React.PropTypes.bool,
  disliked: React.PropTypes.bool
};

Comment.defaultProps = {
  liked: false,
  disliked: false
};

export default Comment;