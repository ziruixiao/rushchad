import React from 'react';
import {
Alert,
Button,
  Col,
  Input,
  ButtonInput,
  Modal,
Row
} from 'react-bootstrap';
import * as firebaseActions from './firebaseActions';

class EditModalView extends React.Component{
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
    e.preventDefault();
    var s_firstName = this.refs.firstName.getValue();
    var s_lastName = this.refs.lastName.getValue();
    if (s_firstName.length < 1 || s_lastName.length < 1) {
      this.handleAlertShow();
    } else { // continue with form
      this.handleAlertDismiss();

      // build photos
      var photoArray = [];
      var s_photo1 = this.refs.photo1.getValue();
      var s_photo2 = this.refs.photo2.getValue();
      var s_photo3 = this.refs.photo3.getValue();
      if (s_photo1.length > 0) {
        photoArray.push(s_photo1);
      }
      if (s_photo2.length > 0) {
        photoArray.push(s_photo2);
      }
      if (s_photo3.length > 0) {
        photoArray.push(s_photo3);
      }

      // 1. Build dictionary
      var dictionary = {
        "firstName": s_firstName,
        "lastName": s_lastName,
        "lastUpdated": Math.round(Number(Date.now())/1000),
        "phone": this.refs.phone.getValue(),
        "email": this.refs.email.getValue(),
        "photos": photoArray,
        "facebook": addHttp(this.refs.facebook.getValue()),
        "rushingWith": this.refs.rushingWith.getValue()
      };
      firebaseActions.addOrUpdateRushee(this.props.activeEditRusheeId, dictionary, this.props.loggedInUserId);
      this.props.closeAction();
    }
  }

  render(){
    var firstName = <Input type="text" ref="firstName" label="First Name" placeholder="Enter first name" />;
    var lastName = <Input type="text" ref="lastName" label="Last Name" placeholder="Enter last name" />;

    var facebook = <Input type="text" ref="facebook" label="Facebook Profile" placeholder="Enter link" />;
    var email = <Input type="email" ref="email" label="Email Address" placeholder="Enter email" />;
    var phone = <Input type="text" ref="phone" label="Phone Number" placeholder="Enter phone" />;

    var photo1 = <Input type="text" ref="photo1" placeholder="Photo URL (should end in .png, .jpeg, .jpg)" />;
    var photo2 = <Input type="text" ref="photo2" placeholder="Photo URL (should end in .png, .jpeg, .jpg)" />;
    var photo3 = <Input type="text" ref="photo3" placeholder="Photo URL (should end in .png, .jpeg, .jpg)" />;

    var rushingWith = <Input type="text" ref="rushingWith" label="Rushing with:" placeholder="Enter other freshmen names" />;
    var error =
      <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss.bind(this)}>
        <p>Please make sure you enter first and last names.</p>
      </Alert>;

    if (this.props.activeEditRusheeId != "-1") {
      var rusheeId = this.props.activeEditRusheeId;
      var arrayRusheeId = 0;
      var rushee;
      var editingRushee;
      for(var i = 0; i < this.props.rushees.length; i += 1) {
        if(this.props.rushees[i][0] == rusheeId) {
          editingRushee = this.props.rushees[i][1];
          break;
        }
      }
      if (editingRushee) {
        firstName = <Input type="text" ref="firstName" label="First Name" defaultValue={editingRushee["firstName"]} placeholder="Enter first name" />;
        lastName = <Input type="text" ref="lastName" label="Last Name" defaultValue={editingRushee["lastName"]} placeholder="Enter last name" />;

        facebook = <Input type="text" ref="facebook" label="Facebook Profile" defaultValue={editingRushee["facebook"]} placeholder="Enter link" />;
        email = <Input type="email" ref="email" label="Email Address" defaultValue={editingRushee["email"]} placeholder="Enter email" />;
        phone = <Input type="text" ref="phone" label="Phone Number" defaultValue={editingRushee["phone"]} placeholder="Enter phone" />;
        if (editingRushee["photos"] && editingRushee["photos"][0]) {
          photo1 = <Input type="text" ref="photo1"  defaultValue={editingRushee["photos"][0]} placeholder="Photo URL (should end in .png, .jpeg, .jpg)" />;
        }
        if (editingRushee["photos"] && editingRushee["photos"][1]) {
          photo2 = <Input type="text" ref="photo2"  defaultValue={editingRushee["photos"][1]} placeholder="Photo URL (should end in .png, .jpeg, .jpg)" />;
        }
        if (editingRushee["photos"] && editingRushee["photos"][2]) {
          photo3 = <Input type="text" ref="photo3"  defaultValue={editingRushee["photos"][2]} placeholder="Photo URL (should end in .png, .jpeg, .jpg)" />;
        }

        if (editingRushee["rushingWith"]) {
          rushingWith = <Input type="text" ref="rushingWith" defaultValue={editingRushee["rushingWith"]} label="Rushing with:" placeholder="Enter other freshmen names" />;
        }
      }
    }
    return (
      <div>
        <Modal show={this.props.showEditModal} onHide={this.props.closeAction}>
          <Modal.Header closeButton>
            <Modal.Title>Add/Edit Rushee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { this.state.errorShowing ?  error : null }

            <form onSubmit={this.handleSubmit.bind(this)}>
              <Row>
                <Col xs={6}>
                  {firstName}
                </Col>
                <Col xs={6}>
                  {lastName}
                </Col>
              </Row>
              {facebook}
              {phone}
              {email}
              <strong>Photos:</strong>
              {photo1}
              {photo2}
              {photo3}
              {rushingWith}
              <ButtonInput type="submit" value="Save" />
              Click anywhere outside this form to discard changes.
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.closeAction}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
};

function addHttp(url) {
  if (!/^https?:\/\//i.test(url)) {
    url = 'http://' + url;
  }
  return url;
}

EditModalView.propTypes = {
  errorShowing: React.PropTypes.bool
};

EditModalView.defaultProps = {
  errorShowing: false
};
export default EditModalView;