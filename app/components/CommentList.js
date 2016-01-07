import React from 'react';
import {
Badge,
  Button,
  Col,
Glyphicon,
Alert,
Input,
  Row,
  Well,
ButtonInput
} from 'react-bootstrap';

import TimeAgo from 'react-timeago';

class CommentList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      errorShowing: false
    };
  }
  handleAlertDismiss() {
    this.setState({errorShowing: false});
  }
  handleAlertShow() {
    this.setState({errorShowing: true});
  }
  handleSubmit(e) {
    var s_comment = this.refs.newComment.getValue();
    if (s_comment.length < 1) {
      this.handleAlertShow();
    } else { // continue with form
      // TODO: Firebase!!
      console.log(s_comment);
      this.handleAlertDismiss();
    }
  }
  handleLike() {

  }
  handleDislike() {

  }
  render(){
    var comments;
    var error =
      <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss.bind(this)}>
        <p>Please make sure your comment is not empty.</p>
      </Alert>;
    if (this.props.comments) {
      comments = this.props.comments.map((comment, key) => {

        var likeButton = <Button bsSize="small"><Glyphicon glyph="thumbs-up" /></Button>;
        var dislikeButton = <Button bsSize="small"><Glyphicon glyph="thumbs-down" /></Button>;
        var numLikes = 0;
        var numDislikes = 0;

        if (comment["likes"]) {
          Object.keys(comment["likes"]).map((likeUserId, likeValue) => {
            var numLikeValue = Number(likeValue);
            if (likeValue == 1) {
              if (likeUserId == this.props.loggedInUserId) { // current user liked comment
                likeButton = <Button bsSize="small" bsStyle="success" active><Glyphicon glyph="thumbs-up" /></Button>;
              }
              numLikes++;
            } else if (likeValue == 0) {
              if (likeUserId == this.props.loggedInUserId) { // current user liked comment
                dislikeButton = <Button bsSize="small" bsStyle="danger" active><Glyphicon glyph="thumbs-down" /></Button>;
              }
              numDislikes++;
            }
          });
        }


        return (
          <div key={key} className="top-bottom-space">
            <Row>
              <Col xs={8} sm={9}>
                <b>{this.props.users[comment["userId"]]["name"]}</b>
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

      });
    }
    return (
      <div>
        <h3>Comments</h3>
        <Well>
        { this.state.errorShowing ?  error : null }
          <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Row className="align-vertical">
            <Col xs={10}>
              <Input type="textarea" ref="newComment" label="Add New Comment" placeholder="Type text here" />
            </Col>
            <Col xs={2} >
              <ButtonInput type="submit" value="Post" />
            </Col>
          </Row>
        </form>
            </div>

        {comments}
        </Well>
      </div>
    )
  }
};

CommentList.propTypes = {
  errorShowing: React.PropTypes.bool
};

CommentList.defaultProps = {
  errorShowing: false
};

export default CommentList;