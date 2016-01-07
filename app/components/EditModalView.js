import React from 'react';
import {
  Col,
  Input,
  ButtonInput,
  Modal,
  Button,
Row
} from 'react-bootstrap';

class EditModalView extends React.Component{
  render(){
    console.log(this.props);
    var firstName = <Input type="text" label="First Name" placeholder="Enter first name" />;
    var lastName = <Input type="text" label="Last Name" placeholder="Enter last name" />;

    var facebook = <Input type="text" label="Facebook Profile" placeholder="Enter link" />;
    var email = <Input type="email" label="Email Address" placeholder="Enter email" />;
    var phone = <Input type="text" label="Phone Number" placeholder="Enter phone" />;
    var sophomore = <Input type="checkbox" label="Sophomore" />;

    if (this.props.activeEditRusheeId != "-1") {
      var editingRushee = this.props.rushees[this.props.activeEditRusheeId];
      if (editingRushee) {
        firstName = <Input type="text" label="First Name" defaultValue={editingRushee["firstName"]} placeholder="Enter first name" />;
        lastName = <Input type="text" label="Last Name" defaultValue={editingRushee["lastName"]} placeholder="Enter last name" />;

        facebook = <Input type="text" label="Facebook Profile" defaultValue={editingRushee["facebook"]} placeholder="Enter link" />;
        email = <Input type="email" label="Email Address" defaultValue={editingRushee["email"]} placeholder="Enter email" />;
        phone = <Input type="text" label="Phone Number" defaultValue={editingRushee["phone"]} placeholder="Enter phone" />;
        if (editingRushee["survey"]["gradeYear"] != 0) {
          sophomore = <Input type="checkbox" label="Sophomore" checked/>;
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
            <form>
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

export default EditModalView;