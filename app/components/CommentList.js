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
import Comment from './Comment';
import * as firebaseActions from './firebaseActions';

class CommentList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      errorShowing: false,
      timestamp: Number(Date.now())
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
      this.handleAlertDismiss();
      var dictionary = {
        "content": s_comment,
        "userId": this.props.loggedInUserId,
        "lastUpdated":  Math.round(Number(Date.now())/1000)
      };
      firebaseActions.addNewComment(this.props.rusheeId, dictionary);
      this.setState({
        timestamp: Number(Date.now())
      });
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
    var commentsLength = 0;
    if (this.props.comments) {
      commentsLength = Object.keys(this.props.comments).length;
      comments = Object.keys(this.props.comments).map((key) => {
        var comment = this.props.comments[key];
        return <Comment rusheeId={this.props.rusheeId} commentId={key} commentUser={this.props.users[comment["userId"]]["name"]} loggedInUserId={this.props.loggedInUserId} key={key} commentData={comment}/>
      });
    }
    return (
      <div>
        <h3>Comments ({commentsLength})</h3>
        <Well>
        { this.state.errorShowing ?  error : null }
          <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Row className="align-vertical">
            <Col xs={10}>
              <Input key={this.state.timestamp} type="textarea" ref="newComment" label="Add New Comment" placeholder="Type text here" />
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
  errorShowing: React.PropTypes.bool,
  timestamp: React.PropTypes.number
};

CommentList.defaultProps = {
  errorShowing: false,
  timestamp: Number(Date.now())
};

export default CommentList;