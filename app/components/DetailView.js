/**
 * Created by Felix on 1/4/16.
 */
import React from 'react';
import {
  Badge,
  Col,
  Glyphicon,
  Row,
  Well
} from 'react-bootstrap';

class DetailView extends React.Component{
  componentWillMount(){
    this.router = this.context.router;
  }
  render(){
    var rusheeId = this.router.getCurrentParams().rusheeId;
    var rushee = this.props.rushees[rusheeId];
    var rusheeName, rusheePhone, rusheeEmail, rusheeFacebook = '';
    if (rushee) {
      rusheeFacebook = rushee["facebook"];
      rusheeName = rushee["firstName"] + ' ' + rushee["lastName"];
      rusheeEmail = <Well><Glyphicon glyph="email" />{rushee["email"]}</Well>;
      rusheePhone = <Well><Glyphicon glyph="phone" />{rushee["phone"]}</Well>;
    }
    console.log(rushee);
    return (
      <div>
        <Row>
          <Col xs={11} md={8}>
            <h1>{rusheeName}</h1>
          </Col>
          <Col xs={6} md={2}>
            Button 1
          </Col>
          <Col xs={6} md={2}>
            Button 2
          </Col>
        </Row>
        <Row>
          {rusheePhone}
          {rusheeEmail}
        </Row>
        <br />

        <br />

        <br />
        {rusheeFacebook}

      </div>
    )
  }
};

DetailView.contextTypes = {
  router: React.PropTypes.func.isRequired
};


export default DetailView;