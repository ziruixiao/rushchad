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
    e.preventDefault();
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
  connectToCommentsRef() {
    if (this.props.rusheeId) {
      var commentsRef = new Firebase('https://rushchad.firebaseio.com/rushees/' + this.props.rusheeId + '/comments');
      commentsRef.on('value', function (dataSnapshot) {
        this.setState({
          comments: dataSnapshot.val()
        });
        console.log("FIREBASE ONCE CALL MADE FOR USERS VALUE");
      }.bind(this));
    }
  }
  componentWillReceiveProps() {
    this.connectToCommentsRef();
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
    if (this.state.comments) {
      commentsLength = Object.keys(this.state.comments).length;


      var unsortedComments = this.state.comments;
      var sortedComments = [];

      for (var u_id in unsortedComments) {
        sortedComments.push([u_id, unsortedComments[u_id]]);
      }
      sortedComments.sort(function(a, b) {
        if (a[1]["lastUpdated"] > b[1]["lastUpdated"]) { return -1; }
        else if (a[1]["lastUpdated"] < b[1]["lastUpdated"]) { return 1; }
        else { return 0; }
      });


      comments = sortedComments.map((value, key) => {
        var comment = value[1];
        console.log(this.props.users);
        if (this.props.users[comment["userId"]]) {
          console.log(comment);
          return <Comment rusheeId={this.props.rusheeId} commentId={value[0]}
                          commentUser={this.props.users[comment["userId"]]["name"]}
                          loggedInUserId={this.props.loggedInUserId}
                          key={value[0]} commentData={comment}/>
        }
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