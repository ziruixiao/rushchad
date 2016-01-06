import React from 'react';
import {
Badge,
  Button,
  Col,
Glyphicon,
  Row,
  Well
} from 'react-bootstrap';

import TimeAgo from 'react-timeago';

class CommentList extends React.Component{
  render(){
    var comments;
    if (this.props.comments) {
      comments = this.props.comments.map((comment, key) => {

        var likeButton = <Button bsSize="small"><Glyphicon glyph="thumbs-up" /></Button>;
        var dislikeButton = <Button bsSize="small"><Glyphicon glyph="thumbs-down" /></Button>;
        var numLikes = 0;
        var numDislikes = 0;

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
        {comments}
        </Well>
      </div>
    )
  }
};

export default CommentList;