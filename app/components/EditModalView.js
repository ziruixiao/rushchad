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
    var s_firstName = this.refs.firstName.getValue();
    var s_lastName = this.refs.lastName.getValue();
    if (s_firstName.length < 1 || s_lastName.length < 1) {
      this.handleAlertShow();
    } else { // continue with form
      this.handleAlertDismiss();
      // TODO: Firebase!!
    }
  }

  render(){
    var firstName = <Input type="text" ref="firstName" label="First Name" placeholder="Enter first name" />;
    var lastName = <Input type="text" ref="lastName" label="Last Name" placeholder="Enter last name" />;

    var facebook = <Input type="text" ref="facebook" label="Facebook Profile" placeholder="Enter link" />;
    var email = <Input type="email" ref="email" label="Email Address" placeholder="Enter email" />;
    var phone = <Input type="text" ref="phone" label="Phone Number" placeholder="Enter phone" />;
    var sophomore = <Input type="checkbox" ref="sophomore" label="Sophomore" />;

    var error =
      <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss.bind(this)}>
        <p>Please make sure you enter first and last names.</p>
      </Alert>;

    if (this.props.activeEditRusheeId != "-1") {
      var editingRushee = this.props.rushees[this.props.activeEditRusheeId];
      if (editingRushee) {
        firstName = <Input type="text" ref="firstName" label="First Name" defaultValue={editingRushee["firstName"]} placeholder="Enter first name" />;
        lastName = <Input type="text" ref="lastName" label="Last Name" defaultValue={editingRushee["lastName"]} placeholder="Enter last name" />;

        facebook = <Input type="text" ref="facebook" label="Facebook Profile" defaultValue={editingRushee["facebook"]} placeholder="Enter link" />;
        email = <Input type="email" ref="email" label="Email Address" defaultValue={editingRushee["email"]} placeholder="Enter email" />;
        phone = <Input type="text" ref="phone" label="Phone Number" defaultValue={editingRushee["phone"]} placeholder="Enter phone" />;
        if (editingRushee["survey"]["gradeYear"] != 0) {
          sophomore = <Input type="checkbox" ref="sophomore" label="Sophomore" checked/>;
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
              {sophomore}
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

EditModalView.propTypes = {
  errorShowing: React.PropTypes.bool
};

EditModalView.defaultProps = {
  errorShowing: false
};
export default EditModalView;